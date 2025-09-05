import { z } from 'zod';

export const QuizQuestionSchema = z.object({
  id: z.number(),
  type: z.enum(['multiple-choice', 'flashcard']),
  question: z.string(),
  options: z.array(z.string()).optional(),
  answer: z.string(),
});

export const MicroTaskSchema = z.object({
  id: z.number(),
  description: z.string(),
});

export const LessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  hook: z.string().optional(),
  core: z
    .object({
      text: z.string(),
      visualUrl: z.string().optional(),
      audioUrl: z.string().optional(),
      pdfUrl: z.string().optional(),
    })
    .optional(),
  action: z.string().optional(),
  reflection: z.string().optional(),
  swipeFile: z.array(z.string()).optional(),
  adaptiveLayers: z
    .object({
      beginner: z.string().optional(),
      advanced: z.string().optional(),
    })
    .optional(),
  gamification: z
    .object({
      xp: z.number().optional(),
      badge: z.string().optional(),
      duel: z.boolean().optional(),
    })
    .optional(),
  quiz: z.array(QuizQuestionSchema).optional(),
  microTask: MicroTaskSchema.optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  path: z.string().optional(),
  audioUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  demo: z.string().optional(),
  storyline: z.string().optional(),
  creatorMode: z.boolean().optional(),
  feedback: z
    .array(
      z.object({
        userId: z.string(),
        comment: z.string(),
        rating: z.number().min(1).max(5).optional(),
      })
    )
    .optional(),
  mentor: z.enum(['guide', 'challenger', 'storyteller', 'coach', 'sage']).optional(),
  bossBattle: z
    .object({
      title: z.string(),
      description: z.string(),
      challenge: z.string(),
      reward: z.string().optional(),
    })
    .optional(),
  motivation: z
    .object({
      message: z.string().optional(),
      badge: z.string().optional(),
      streakRequired: z.number().optional(),
      adaptiveDifficulty: z.enum(['easy', 'normal', 'hard']).optional(),
      feedbackType: z.enum(['positive', 'neutral', 'negative']).optional(),
    })
    .optional(),
});

export type Lesson = z.infer<typeof LessonSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type MicroTask = z.infer<typeof MicroTaskSchema>;

export const lessons = [
  {
    id: 1,
    title: 'Prompt Engineering',
    description: 'Learn to structure prompts for optimal AI output.',
    hook: 'Your AI is only as smart as the question you ask. Here’s how to weaponize it.',
    core: {
      text: 'See how two real prompts produce different results. Try rewriting your own!',
      visualUrl: '/lesson-visuals/prompt-comparison.png',
      audioUrl: '/lesson-audio/prompt-engineering.mp3',
      pdfUrl: '/lesson-pdfs/prompt-engineering.pdf',
    },
    action: 'Rewrite one of your own prompts using today’s rule.',
    reflection: 'Drop your before/after prompt in your dashboard → earn XP.',
    swipeFile: [
      'Rewrite: "Summarize this article for a 5th grader."',
      'Chain: "Draft LinkedIn post → summarize → auto-publish."',
    ],
    adaptiveLayers: {
      beginner: 'Try rewriting a simple question.',
      advanced: 'Chain 3 prompts into a workflow using n8n.',
    },
    gamification: {
      xp: 50,
      badge: 'Prompt Pro',
      duel: true,
    },
    difficulty: 'beginner' as const,
    path: 'prompt-engineering',
    completed: true,
  },
  {
    id: 2,
    title: 'Automation Basics',
    description: 'Automate repetitive tasks with AI tools.',
    hook: 'What if you could automate your morning routine with one click?',
    core: {
      text: 'Learn the basics of automation and set up your first workflow.',
      visualUrl: '/lesson-visuals/automation-basics.png',
    },
    action: 'Automate a daily task using a template.',
    reflection: 'What did you automate today?',
    swipeFile: ['Use Zapier to connect Gmail and Notion.'],
    adaptiveLayers: {
      beginner: 'Start with a simple email automation.',
      advanced: 'Add a conditional step to your workflow.',
    },
    gamification: {
      xp: 40,
      badge: 'Automator',
      duel: false,
    },
    difficulty: 'beginner' as const, // changed to string literal type
    path: 'automation',
    completed: false,
  },
];

export async function getLessonsForPath(path: string): Promise<Lesson[]> {
  // Filter lessons array by path
  const result = lessons.filter((lesson) => lesson.path === path);
  // Validate each lesson
  return result.filter((lesson) => LessonSchema.safeParse(lesson).success);
}
