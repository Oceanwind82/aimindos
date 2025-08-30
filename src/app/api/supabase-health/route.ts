import supabase from '../lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase.from('waitlist').select('*').limit(1);
  if (error) {
    return new Response(`❌ Supabase connection failed: ${error.message}`, { status: 500 });
  }
  return new Response(`✅ Supabase connection succeeded! Data: ${JSON.stringify(data)}`);
}
