import { Lesson } from '@/lib/lessons';

export interface UserProgress {
  userId: string;
  completedLessons: Array<{
    lessonId: number;
    completedAt: string;
    xpEarned: number;
    streak: number;
    feedback?: 'easy' | 'hard' | undefined;
  }>;
  badges: string[];
  lastRecapSent?: string;
}

export function completeLesson(
  progress: UserProgress,
  lesson: Lesson,
  feedback?: 'easy' | 'hard'
): UserProgress {
  const now = new Date().toISOString();
  let xp = 10;
  if (lesson.difficulty === 'intermediate') xp = 20;
  if (lesson.difficulty === 'advanced') xp = 30;
  const streak =
    progress.completedLessons.length > 0 &&
    new Date(now).getDate() ===
      new Date(
        progress.completedLessons[progress.completedLessons.length - 1].completedAt
      ).getDate() +
        1
      ? progress.completedLessons[progress.completedLessons.length - 1].streak + 1
      : 1;
  return {
    ...progress,
    completedLessons: [
      ...progress.completedLessons,
      {
        lessonId: lesson.id,
        completedAt: now,
        xpEarned: xp,
        streak,
        feedback,
      },
    ],
  };
}

export function awardBadge(progress: UserProgress, badge: string): UserProgress {
  if (!progress.badges.includes(badge)) {
    return { ...progress, badges: [...progress.badges, badge] };
  }
  return progress;
}

export function getXP(progress: UserProgress): number {
  return progress.completedLessons.reduce((sum, l) => sum + l.xpEarned, 0);
}

export function getStreak(progress: UserProgress): number {
  return progress.completedLessons.length > 0
    ? progress.completedLessons[progress.completedLessons.length - 1].streak
    : 0;
}
