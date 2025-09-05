import { NextResponse } from 'next/server';

export async function GET() {
  const reqs = [
    'NEXT_PUBLIC_APP_NAME',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'STRIPE_SECRET_KEY',
    'SANITY_PROJECT_ID',
    'SANITY_DATASET',
    'SANITY_API_TOKEN',
    'TELEGRAM_BOT_TOKEN',
  ];

  const missing = reqs.filter((k) => !process.env[k]);
  return NextResponse.json({
    ok: missing.length === 0,
    missing,
    setInVercel: 'Project → Settings → Environment Variables',
  });
}
