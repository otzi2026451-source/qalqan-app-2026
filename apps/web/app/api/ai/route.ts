import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const MODEL_CANDIDATES = Array.from(new Set([
  process.env.GEMINI_MODEL,
  'gemini-3.6-flash',
  'gemini-2.5-flash'
].filter(Boolean) as string[]));

const SYSTEM_INSTRUCTION = `Ты — QALQAN AI, учебный помощник цифровой экосистемы Академии.

Помогай пользователям:
- изучать историю Казахстана;
- изучать математику;
- изучать IT;
- изучать информационную безопасность;
- готовиться к экзаменам.

Отвечай понятно, структурированно и по шагам.
Не запрашивай секретную информацию, служебные данные или персональные документы.`;

type AttachmentInput = {
  name?: string;
  mimeType?: string;
  kind?: string;
  dataUrl?: string;
};

function parseInlineDataFromDataUrl(dataUrl: string) {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  const match = dataUrl.match(/^data:(.*?);base64,(.*)$/i);
  if (!match) return null;
  const mimeType = match[1] || 'application/octet-stream';
  const base64 = match[2] || '';
  return { mimeType, data: base64 };
}

function extractGeminiText(response: unknown): string {
  if (!response || typeof response !== 'object') return '';

  const candidateText = (response as { text?: string }).text;
  if (typeof candidateText === 'string' && candidateText.trim()) {
    return candidateText.trim();
  }

  const candidates = (response as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }).candidates;
  if (Array.isArray(candidates)) {
    const joined = candidates
      .flatMap((candidate) => candidate?.content?.parts ?? [])
      .map((part) => part?.text ?? '')
      .join('')
      .trim();
    if (joined) return joined;
  }

  return '';
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    let body: Record<string, unknown> = {};

    if (rawBody) {
      try {
        body = JSON.parse(rawBody) as Record<string, unknown>;
      } catch {
        return NextResponse.json({ error: 'Некорректный JSON тела запроса' }, { status: 400 });
      }
    }

    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
    const attachments: AttachmentInput[] = Array.isArray(body?.attachments) ? body.attachments as AttachmentInput[] : [];

    if (!prompt && !attachments.length) {
      return NextResponse.json({ error: 'Текст запроса обязателен' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        {
          configured: false,
          reply: 'QALQAN AI пока не настроен.\n\nВставьте валидный GEMINI_API_KEY в apps/web/.env.local и перезапустите сервер.'
        },
        { status: 200 }
      );
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const messageParts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

      const textPrompt = attachments.length > 0
        ? `${prompt || 'Ниже прикреплены материалы'}\n\n${attachments.map((attachment) => `Вложение: ${attachment.name} (${attachment.mimeType || 'file'})`).join('\n')}`
        : prompt;

      if (textPrompt) {
        messageParts.push({ text: textPrompt });
      }

      for (const attachment of attachments) {
        if (!attachment?.dataUrl || typeof attachment.dataUrl !== 'string') continue;
        const inlineData = parseInlineDataFromDataUrl(attachment.dataUrl);
        if (!inlineData) continue;

        if (attachment.kind === 'image' || attachment.mimeType?.startsWith('image/')) {
          messageParts.push({ inlineData });
        }
      }

      let lastError: unknown = null;

      for (const modelName of MODEL_CANDIDATES) {
        for (let attempt = 0; attempt < 3; attempt += 1) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: [{ role: 'user', parts: messageParts }],
              config: {
                systemInstruction: SYSTEM_INSTRUCTION
              }
            });

            const text = extractGeminiText(response) || 'Ответ сформирован.';
            return NextResponse.json({ configured: true, reply: text });
          } catch (error) {
            lastError = error;
            const message = error instanceof Error ? error.message : String(error);
            const retriable = /429|503|UNAVAILABLE|RATE_LIMIT|high demand|temporar/i.test(message);
            const modelUnavailable = /NOT_FOUND|model.*not.*available|invalid.*model|unsupported.*model|404/i.test(message);

            if (retriable && attempt < 2) {
              const delayMs = 1000 * (attempt + 1);
              console.warn(`Gemini temporary overload for ${modelName}; retry ${attempt + 1}/3 in ${delayMs}ms`, message);
              await new Promise((resolve) => setTimeout(resolve, delayMs));
              continue;
            }

            if (modelUnavailable) {
              console.warn(`Gemini model ${modelName} unavailable, trying fallback.`, message);
              break;
            }

            throw error;
          }
        }
      }

      throw lastError ?? new Error('Gemini model unavailable');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const invalidKey = /invalid authentication credentials|UNAUTHENTICATED|ACCESS_TOKEN_TYPE_UNSUPPORTED|API key|401/i.test(message);
      const modelIssue = /NOT_FOUND|model.*not.*available|unsupported.*model|invalid.*model|404/i.test(message);

      console.error('Gemini request failed:', error);
      return NextResponse.json(
        {
          configured: true,
          reply: invalidKey
            ? 'GEMINI_API_KEY невалиден, истёк или не соответствует Google Gemini. Замените ключ в apps/web/.env.local и перезапустите сервер.'
            : modelIssue
              ? 'Выбранная модель Gemini недоступна. Проверьте GEMINI_MODEL в apps/web/.env.local и используйте поддерживаемую модель.'
              : 'Не удалось получить ответ. Попробуйте ещё раз.',
          error: invalidKey ? 'INVALID_API_KEY' : modelIssue ? 'MODEL_UNAVAILABLE' : 'GEMINI_REQUEST_FAILED'
        },
        { status: invalidKey ? 401 : 200 }
      );
    }
  } catch (error) {
    console.error('QALQAN AI route failed:', error);
    return NextResponse.json(
      {
        configured: true,
        reply: 'Не удалось получить ответ. Попробуйте ещё раз.'
      },
      { status: 200 }
    );
  }
}
