import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return NextResponse.json(
      { ok: false, error: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY.' },
      { status: 500 }
    );
  }

  try {
    // Cheap no-op: hit the health endpoint via fetch through the URL we already have
    const r = await fetch(`${url.replace(/\/+$/, '')}/auth/v1/health`, { cache: 'no-store' });
    return NextResponse.json({ ok: r.ok });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
}
