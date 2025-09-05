import { supabase } from './supabaseUser';

export type Profile = {
  user_id: string;
  tg_chat_id?: string;
  name?: string;
  path?: 'automation' | 'coding' | 'prompting' | 'business';
  mentor?: string;
  streak?: number;
  xp?: number;
  last_lesson_at?: string;
};

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) {
    console.error('Supabase getProfile error:', error.message);
    return null;
  }
  return data as Profile;
}

export async function updateXP(userId: string, xpDelta: number): Promise<boolean> {
  const { error } = await supabase.rpc('increment_xp', { user_id: userId, xp_delta: xpDelta });
  if (error) {
    console.error('Supabase updateXP error:', error.message);
    return false;
  }
  return true;
}

export async function updateStreak(userId: string, streakDelta: number): Promise<boolean> {
  const { error } = await supabase.rpc('increment_streak', {
    user_id: userId,
    streak_delta: streakDelta,
  });
  if (error) {
    console.error('Supabase updateStreak error:', error.message);
    return false;
  }
  return true;
}

export async function setLastLessonAt(userId: string, timestamp: string): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update({ last_lesson_at: timestamp })
    .eq('user_id', userId);
  if (error) {
    console.error('Supabase setLastLessonAt error:', error.message);
    return false;
  }
  return true;
}

export async function getAllUsers(): Promise<string[]> {
  const { data, error } = await supabase.from('profiles').select('user_id');
  if (error) {
    console.error('Supabase getAllUsers error:', error.message);
    return [];
  }
  return data ? data.map((profile: { user_id: string }) => profile.user_id) : [];
}
