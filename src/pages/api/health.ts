import type { NextApiResponse } from 'next';

export default function handler(res: NextApiResponse) {
  res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
}
