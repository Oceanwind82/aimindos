import { z } from 'zod';

export const LessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export type Lesson = z.infer<typeof LessonSchema>;

const lessons: Record<string, Lesson[]> = {
  ai: [
    { id: 1, title: 'Intro to AI', description: 'Understand the basics of AI.' },
    { id: 2, title: 'Prompt Engineering', description: 'Learn how to talk to AI effectively.' },
  ],
  coding: [
    { id: 1, title: 'HTML Basics', description: 'Learn the building blocks of the web.' },
    { id: 2, title: 'JavaScript Intro', description: 'Make websites interactive.' },
  ],
};

export async function getLessonsForPath(path: string): Promise<Lesson[]> {
  const result = lessons[path] || [];
  // Validate each lesson
  return result.filter((lesson) => LessonSchema.safeParse(lesson).success);
}
