import type { NextApiRequest, NextApiResponse } from 'next';

const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Telegram sends the secret in header 'X-Telegram-Bot-Api-Secret-Token'
  const incomingSecret = req.headers['x-telegram-bot-api-secret-token'];

  if (!TELEGRAM_WEBHOOK_SECRET || incomingSecret !== TELEGRAM_WEBHOOK_SECRET) {
    return res.status(401).json({ ok: false, error: 'Invalid webhook secret' });
  }

  // Process Telegram update (message, callback, etc.)
  // Example: Log the received Telegram update
  console.log('Received Telegram update:', req.body);

  // You can add further processing here, e.g., handling messages or callbacks

  res.status(200).json({ ok: true });
}
