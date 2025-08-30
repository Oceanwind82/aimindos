import { supabase } from './supabaseUser';

export type LessonQueue = {
  id: string;
  user_id: string;
  lesson_id: string;
  due_at: string;
  status: 'queued' | 'sent' | 'completed' | 'skipped';
};

export async function getDueLessons(userId: string): Promise<LessonQueue[]> {
  const { data, error } = await supabase
    .from('lesson_queue')
    .select('*')
    .eq('user_id', userId)
    .lte('due_at', new Date().toISOString())
    .eq('status', 'queued');
  if (error) {
    console.error('Supabase getDueLessons error:', error.message);
    return [];
  }
  return data as LessonQueue[];
}

export async function updateLessonQueueStatus(
  id: string,
  status: LessonQueue['status']
): Promise<boolean> {
  const { error } = await supabase.from('lesson_queue').update({ status }).eq('id', id);
  if (error) {
    console.error('Supabase updateLessonQueueStatus error:', error.message);
    return false;
  }
  return true;
}

export async function scheduleNextLesson(
  userId: string,
  lessonId: string,
  dueAt: string
): Promise<boolean> {
  const { error } = await supabase
    .from('lesson_queue')
    .insert({ user_id: userId, lesson_id: lessonId, due_at: dueAt, status: 'queued' });
  if (error) {
    console.error('Supabase scheduleNextLesson error:', error.message);
    return false;
  }
  return true;
}
