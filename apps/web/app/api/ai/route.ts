import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = 'gemini-3.6-flash';
const SYSTEM_INSTRUCTION = `Ты — QALQAN AI, учебный помощник цифровой экосистемы Академии. Помогай пользователю изучать историю Казахстана, математику, IT, информационную безопасность, языки и другие учебные дисциплины. Объясняй простым и понятным языком, при необходимости используй пошаговое объяснение. Не запрашивай и не обрабатывай секретную, служебную или конфиденциальную информацию.`;

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

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json(
        {
          configured: false,
          reply: 'QALQAN AI пока не настроен.\n\nДобавьте GEMINI_API_KEY в `.env.local` и перезапустите сервер.'
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

      const generateWithRetry = async (attempt = 0): Promise<string> => {
        try {
          const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: 'user', parts: messageParts }],
            config: {
              systemInstruction: SYSTEM_INSTRUCTION
            }
          });

          const text = typeof response?.text === 'string' && response.text.trim()
            ? response.text.trim()
            : 'Ответ сформирован.';

          return text;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          const isRetryable = /429|503|UNAVAILABLE|RATE_LIMIT|high demand|temporar/i.test(message);

          if (isRetryable && attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 1200 * (attempt + 1)));
            return generateWithRetry(attempt + 1);
          }

          throw error;
        }
      };

      const text = await generateWithRetry();

      return NextResponse.json({ configured: true, reply: text });
    } catch (error) {
      console.error('Gemini request failed:', error);
      return NextResponse.json(
        {
          configured: true,
          reply: 'Не удалось получить ответ. Попробуйте ещё раз.'
        },
        { status: 200 }
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
