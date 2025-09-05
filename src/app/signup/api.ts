import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendConfirmationEmail } from '../../lib/sendConfirmationEmail';

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data, error } = await supabase.from('waitlist').insert({ email, name }).select();
  if (error || !data?.[0]) {
    return NextResponse.json({ error: error?.message || 'Signup failed' }, { status: 500 });
  }

  // Generate confirmation link
  const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup/confirm?id=${data[0].id}&token=dummy`;

  // Send confirmation email
  await sendConfirmationEmail({ email, confirmUrl });

  return NextResponse.json({ success: true });
}
