import type { NextApiRequest, NextApiResponse } from 'next';
import { getDueLessons, updateLessonQueueStatus } from '../../../lib/lessonQueue';
import { getProfile, getAllUsers } from '../../../lib/profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dryrun = req.query.dryrun;

  let userIds: string[] = [];
  if (req.query.userId) {
    userIds = [req.query.userId as string];
  } else {
    const allUserIds = await getAllUsers();
    userIds = await filterUsersWithDueLessons(allUserIds);
  }
  const results: any[] = [];
  const { ai, coding } = require('@/lib/lessons');

  for (const userId of userIds) {
    const userResults = await processUserLessons(userId, ai, coding, dryrun);
    results.push(...userResults);
  }

  res.status(200).json({ ok: true, results });
}

async function filterUsersWithDueLessons(allUserIds: string[]): Promise<string[]> {
  const filtered: string[] = [];
  for (const userId of allUserIds) {
    const dueLessons = await getDueLessons(userId);
    if (dueLessons && dueLessons.length > 0) {
      filtered.push(userId);
    }
  }
  return filtered;
}

async function processUserLessons(
  userId: string,
  ai: any[],
  coding: any[],
  dryrun: any
): Promise<any[]> {
  const results: {
    user: string | undefined;
    lesson: any;
    pdfUrl: string;
    motivationMsg: string;
    badgeAwarded: string;
    adaptiveDifficulty: any;
    status: string;
  }[] = [];
  const dueLessons = await getDueLessons(userId);

  for (const queue of dueLessons) {
    const profile = await getProfile(queue.user_id);
    const lesson = findLessonById(queue.lesson_id, ai, coding);
    const { motivationMsg, badgeAwarded, adaptiveDifficulty } = getMotivationAndDifficulty(
      lesson,
      profile
    );
    const pdfUrl = 'https://example.com/sample.pdf';

    if (!dryrun) {
      await updateLessonQueueStatus(queue.id, 'sent');
    }

    results.push({
      user: profile?.name,
      lesson: lesson.title,
      pdfUrl,
      motivationMsg,
      badgeAwarded,
      adaptiveDifficulty,
      status: dryrun ? 'dryrun' : 'sent',
    });
  }
  return results;
}

function findLessonById(lessonId: string | number, aiLessons: any[], codingLessons: any[]): any {
  return (
    aiLessons.find((l: any) => l.id == lessonId) ||
    codingLessons.find((l: any) => l.id == lessonId) || {
      title: 'Sample Lesson',
      body_md: 'Lesson content here.',
    }
  );
}

function getMotivationAndDifficulty(lesson: any, profile: any) {
  let motivationMsg = '';
  let badgeAwarded = '';
  let adaptiveDifficulty = lesson.motivation?.adaptiveDifficulty || lesson.difficulty;
  if (lesson.motivation) {
    if (
      profile?.streak &&
      lesson.motivation.streakRequired &&
      profile.streak >= lesson.motivation.streakRequired
    ) {
      motivationMsg = lesson.motivation.message || '';
      badgeAwarded = lesson.motivation.badge || '';
    }
    if (lesson.motivation.feedbackType === 'negative') {
      adaptiveDifficulty = 'easy';
    } else if (lesson.motivation.feedbackType === 'positive') {
      adaptiveDifficulty = 'hard';
    }
  }
  return { motivationMsg, badgeAwarded, adaptiveDifficulty };
}
