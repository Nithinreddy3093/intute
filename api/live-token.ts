import { GoogleGenAI } from '@google/genai';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { DEFAULT_LIVE_API_MODEL } from '../lib/constants';

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed.' }));
    return;
  }

  const origin = req.headers.origin;
  const host = req.headers.host;
  let originUrl: URL;

  try {
    if (typeof origin !== 'string' || typeof host !== 'string') {
      throw new Error('Missing request origin.');
    }
    originUrl = new URL(origin);
  } catch {
    res.statusCode = 403;
    res.end(JSON.stringify({ error: 'Request origin is not allowed.' }));
    return;
  }

  const isSecureOrigin =
    originUrl.protocol === 'https:' ||
    (originUrl.protocol === 'http:' && originUrl.hostname === 'localhost');
  if (!isSecureOrigin || originUrl.host.toLowerCase() !== host.toLowerCase()) {
    res.statusCode = 403;
    res.end(JSON.stringify({ error: 'Request origin is not allowed.' }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'Gemini Live API is not configured.' }));
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const now = Date.now();
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(now + 5 * 60 * 1000).toISOString(),
        newSessionExpireTime: new Date(now + 60 * 1000).toISOString(),
        liveConnectConstraints: {
          model: DEFAULT_LIVE_API_MODEL,
        },
      },
    });

    if (!token.name) {
      throw new Error('Gemini did not return an ephemeral token.');
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    res.end(JSON.stringify({ token: token.name }));
  } catch (error) {
    console.error('Could not create Gemini Live API token:', error);
    res.statusCode = 502;
    res.end(JSON.stringify({ error: 'Could not start a Gemini Live session.' }));
  }
}
