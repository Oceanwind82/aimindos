import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const token = url.searchParams.get('token');
  if (!id || !token) {
    return NextResponse.json({ error: 'Missing id or token' }, { status: 400 });
  }

  // Validate token by checking if it matches the expected value for the given id
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // Fetch the user with the given id and token
  const { data: userData, error: userError } = await supabase
    .from('waitlist')
    .select('id, token, confirmed_at')
    .eq('id', id)
    .eq('token', token)
    .single();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }
  if (!userData || userData.confirmed_at) {
    return NextResponse.json(
      { error: 'Invalid token, already confirmed, or not found' },
      { status: 404 }
    );
  }

  // Confirm the user
  const { data, error } = await supabase
    .from('waitlist')
    .update({ confirmed_at: new Date().toISOString() })
    .eq('id', id)
    .is('confirmed_at', null)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Already confirmed or not found' }, { status: 404 });
  }

  // Optionally: send welcome email/DM here

  return NextResponse.json({ success: true, message: 'Welcome! You are confirmed.' });
}
