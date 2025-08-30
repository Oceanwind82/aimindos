import { createClient } from '@supabase/supabase-js';

// You should set these in your environment variables for security
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  username: string;
  avatar_url?: string;
  xp?: number;
  streak?: number;
  preferences?: Record<string, any>;
};

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) {
    console.error('Supabase error:', error.message);
    return null;
  }
  return data as UserProfile;
}

// Example: Fetch current user profile (if using Supabase Auth)
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return getUserProfile(user.id);
}
