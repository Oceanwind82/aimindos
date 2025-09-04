import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  const { data, error } = await supabase.from('waitlist').select('*').limit(1);
  if (error) {
    return new Response(`❌ Supabase connection failed: ${error.message}`, { status: 500 });
  }
  return new Response(`✅ Supabase connection succeeded! Data: ${JSON.stringify(data)}`);
}
