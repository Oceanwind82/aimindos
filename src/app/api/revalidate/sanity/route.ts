import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { revalidateTag } from 'next/cache';

function verifySignature(req: NextRequest, secret: string) {
  const signature = req.headers.get('X-Sanity-Signature');
  if (!signature) return false;
  const bodyText = (req as any).__body || ''; // fallback, Next keeps parsed body; we’ll re-read below anyway
  const hmac = crypto.createHmac('sha256', secret).update(bodyText).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmac));
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: 'Missing secret' }, { status: 500 });

  // We must read the raw body for signature check
  const raw = await req.text();
  (req as any).__body = raw;

  const valid = verifySignature(req, secret);
  if (!valid) return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 });

  // Minimal parse
  const payload = JSON.parse(raw || '{}');
  const docType = payload?._type || payload?.transition?.to?._type;
  const affectedTags = new Set<string>(['lessons']); // global lessons list

  // Optionally tag by type/id for targeted revalidate
  if (docType) affectedTags.add(`type:${docType}`);
  if (payload?._id) affectedTags.add(`doc:${payload._id}`);

  for (const tag of affectedTags) {
    revalidateTag(tag);
  }

  return NextResponse.json({ ok: true, revalidated: Array.from(affectedTags) });
}
