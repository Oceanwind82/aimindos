import { supabase } from './supabaseUser';
import type { LessonQueue } from './lessonQueue';

export async function getAllDueLessons(): Promise<LessonQueue[]> {
  const { data, error } = await supabase
    .from('lesson_queue')
    .select('*')
    .lte('due_at', new Date().toISOString())
    .eq('status', 'queued');
  if (error) {
    console.error('Supabase getAllDueLessons error:', error.message);
    return [];
  }
  return data as LessonQueue[];
}

export async function getNextDueLessonForUser(userId: string): Promise<LessonQueue | null> {
  const { data, error } = await supabase
    .from('lesson_queue')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'queued')
    .order('due_at', { ascending: true })
    .limit(1);
  if (error || !data || data.length === 0) {
    console.error('Supabase getNextDueLessonForUser error:', error?.message);
    return null;
  }
  return data[0] as LessonQueue;
}
