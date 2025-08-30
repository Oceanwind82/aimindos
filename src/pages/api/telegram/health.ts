import type { NextApiRequest, NextApiResponse } from 'next';

// Stub: Replace with actual Telegram send logic
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chatId = req.query.to as string;
  if (!chatId) {
    return res.status(400).json({ ok: false, error: 'Missing chat_id' });
  }
  // TODO: Send a test DM to Telegram chatId
  // await sendTelegramMessage(chatId, 'pong');
  res.status(200).json({ ok: true, sent: true, chatId });
}
