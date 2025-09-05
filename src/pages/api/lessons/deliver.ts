import type { NextApiRequest, NextApiResponse } from 'next';
import { getDueLessons, updateLessonQueueStatus } from '@/lib/lessonQueue';
import { getProfile, getAllUsers } from '@/lib/profile';
// import { fetchLesson } from '@/lib/lessons'; // If you have a DB lessons table
// import { renderPDF } from '@/lib/pdf'; // Stub for PDF rendering
// import { sendTelegramMessage } from '@/lib/telegram'; // Stub for Telegram

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dryrun = req.query.dryrun;

  // TODO: Select all users with due lessons (for demo, use a test user)
  // Assume you have a function getAllUsers() that returns all user IDs

  const userIds = req.query.userId ? [req.query.userId as string] : await getAllUsers();
  const results = [];
  // Import lessons statically for demo
  const { ai, coding } = require('@/lib/lessons');

  for (const userId of userIds) {
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

  res.status(200).json({ ok: true, results });
}
