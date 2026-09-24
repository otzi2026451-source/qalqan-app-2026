const { GoogleGenAI } = require('@google/genai');

const MODEL_CANDIDATES = Array.from(new Set([
  process.env.GEMINI_MODEL,
  'gemini-3.6-flash',
  'gemini-2.5-flash'
].filter(Boolean)));

function extractGeminiText(response) {
  if (!response || typeof response !== 'object') return '';

  if (typeof response.text === 'string' && response.text.trim()) {
    return response.text.trim();
  }

  const candidates = response.candidates;
  if (Array.isArray(candidates)) {
    const text = candidates
      .flatMap((candidate) => candidate?.content?.parts ?? [])
      .map((part) => part?.text ?? '')
      .join('')
      .trim();
    if (text) return text;
  }

  return '';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = {};

    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch {
        body = {};
      }
    } else if (req.body && typeof req.body === 'object') {
      body = req.body;
    }

    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return res.status(500).json({
        configured: false,
        error: 'Missing server-side GEMINI_API_KEY',
        reply: 'Backend is not configured. Set GEMINI_API_KEY on the server.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let lastError = null;

    for (const modelName of MODEL_CANDIDATES) {
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
              systemInstruction: 'Ты — QALQAN AI, учебный помощник по образованию, математике, IT, истории Казахстана и кибербезопасности. Отвечай понятно, по шагам, без лишнего технического шума.'
            }
          });

          const reply = extractGeminiText(response) || 'Ответ сформирован.';
          return res.status(200).json({ configured: true, reply });
        } catch (error) {
          lastError = error;
          const message = error instanceof Error ? error.message : String(error);
          const retriable = /429|503|UNAVAILABLE|RATE_LIMIT|high demand|temporar/i.test(message);
          const modelUnavailable = /NOT_FOUND|model.*not.*available|invalid.*model|unsupported.*model|404/i.test(message);

          if (retriable && attempt < 2) {
            const delayMs = 1000 * (attempt + 1);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
            continue;
          }

          if (modelUnavailable) {
            continue;
          }

          throw error;
        }
      }
    }

    throw lastError || new Error('Gemini request failed');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isUnauthorized = /invalid authentication credentials|UNAUTHENTICATED|401|ACCESS_TOKEN_TYPE_UNSUPPORTED/i.test(message);
    const isUnavailable = /429|503|UNAVAILABLE|high demand|temporar/i.test(message);

    if (isUnauthorized) {
      return res.status(401).json({ configured: true, error: 'INVALID_API_KEY', reply: 'Gemini API key is invalid or expired.' });
    }

    if (isUnavailable) {
      return res.status(503).json({ configured: true, error: 'GEMINI_TEMPORARILY_UNAVAILABLE', reply: 'Gemini is temporarily overloaded. Please retry in a moment.' });
    }

    return res.status(500).json({ configured: true, error: 'GEMINI_REQUEST_FAILED', reply: 'Failed to get a response from Gemini.' });
  }
};
