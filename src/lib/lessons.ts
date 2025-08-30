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

const lessons: Record<string, Lesson[]> = {
  ai: [
    {
      id: 1,
      title: 'Intro to AI',
      description: 'Understand the basics of AI.',
      hook: 'Today, you unlock the algorithm rebels fear.',
      storyline:
        'Chapter 1: The Awakening. You step into a world where machines begin to think, and your journey as an AI explorer begins.',
      creatorMode: false,
      feedback: [
        { userId: 'user1', comment: 'Great intro, very clear!', rating: 5 },
        { userId: 'user2', comment: 'Loved the storyline.', rating: 4 },
      ],
      mentor: 'guide',
      bossBattle: {
        title: 'AI Boss Battle: The Turing Test',
        description: 'Prove your understanding by passing the ultimate AI challenge.',
        challenge: 'Design a prompt that convinces an AI to act indistinguishably from a human.',
        reward: 'AI Explorer Badge',
      },
      motivation: {
        message: 'Keep your streak alive for bonus XP!',
        badge: 'Streak Starter',
        streakRequired: 3,
        adaptiveDifficulty: 'easy',
        feedbackType: 'positive',
      },
      quiz: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'What does AI stand for?',
          options: ['Artificial Intelligence', 'Automated Input', 'Active Inquiry'],
          answer: 'Artificial Intelligence',
        },
        {
          id: 2,
          type: 'flashcard',
          question: "Define 'machine learning'.",
          answer: 'A subset of AI focused on algorithms that learn from data.',
        },
      ],
      microTask: {
        id: 1,
        description: "Try asking ChatGPT: 'Explain AI in one sentence.'",
      },
      difficulty: 'beginner',
      path: 'ai',
      audioUrl: 'https://example.com/audio/ai-intro.mp3',
      videoUrl: 'https://example.com/video/ai-intro.mp4',
      demo: 'chatbot',
    },
    {
      id: 2,
      title: 'Prompt Engineering',
      description: 'Learn how to talk to AI effectively.',
      hook: 'You’re about to master the language that moves machines.',
      storyline:
        'Chapter 2: The Language of Machines. You discover the secret codes that unlock new AI powers.',
      creatorMode: true,
      feedback: [{ userId: 'user3', comment: 'Prompt tips were super useful.', rating: 5 }],
      mentor: 'challenger',
      motivation: {
        message: 'Challenge yourself for a new badge!',
        badge: 'Prompt Pro',
        streakRequired: 5,
        adaptiveDifficulty: 'normal',
        feedbackType: 'neutral',
      },
      quiz: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'What is a prompt?',
          options: ['A question', 'A command', 'Both'],
          answer: 'Both',
        },
      ],
      microTask: {
        id: 2,
        description: 'Write a prompt for generating a blog post about AI.',
      },
      difficulty: 'intermediate',
      path: 'ai',
      audioUrl: 'https://example.com/audio/prompt-engineering.mp3',
      videoUrl: 'https://example.com/video/prompt-engineering.mp4',
      demo: 'prompt-playground',
    },
  ],
  coding: [
    {
      id: 1,
      title: 'HTML Basics',
      description: 'Learn the building blocks of the web.',
      hook: 'Step into the code vault: the web’s foundation awaits.',
      storyline: 'Chapter 1: The Websmith. You forge the first links in the chain of the internet.',
      creatorMode: false,
      feedback: [{ userId: 'user4', comment: 'Easy to follow!', rating: 5 }],
      mentor: 'storyteller',
      motivation: {
        message: 'Complete this lesson to unlock the Websmith badge!',
        badge: 'Websmith',
        streakRequired: 1,
        adaptiveDifficulty: 'easy',
        feedbackType: 'positive',
      },
      bossBattle: {
        title: 'Coding Boss Battle: The Web Forge',
        description: 'Demonstrate your mastery by building a multi-section HTML page.',
        challenge: 'Create an HTML page with a header, navigation, main content, and footer.',
        reward: 'Websmith Badge',
      },
      quiz: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'What does HTML stand for?',
          options: [
            'HyperText Markup Language',
            'Home Tool Markup Language',
            'Hyperlinks and Text Markup Language',
          ],
          answer: 'HyperText Markup Language',
        },
      ],
      microTask: {
        id: 3,
        description: 'Create a simple HTML page with a heading and a paragraph.',
      },
      difficulty: 'beginner',
      path: 'coding',
      audioUrl: 'https://example.com/audio/html-basics.mp3',
      videoUrl: 'https://example.com/video/html-basics.mp4',
      demo: 'code-cell',
    },
    {
      id: 2,
      title: 'JavaScript Intro',
      description: 'Make websites interactive.',
      hook: 'You now wield the power to make the web come alive.',
      storyline:
        'Chapter 2: The Animator. You breathe life into static pages, making them dance to your code.',
      creatorMode: true,
      feedback: [{ userId: 'user5', comment: 'Fun coding task!', rating: 4 }],
      mentor: 'coach',
      motivation: {
        message: 'Keep going to earn the Animator badge!',
        badge: 'Animator',
        streakRequired: 2,
        adaptiveDifficulty: 'normal',
        feedbackType: 'positive',
      },
      quiz: [
        {
          id: 1,
          type: 'flashcard',
          question: 'What is a variable in JavaScript?',
          answer: 'A container for storing data values.',
        },
      ],
      microTask: {
        id: 4,
        description: 'Write a JS function that adds two numbers.',
      },
      difficulty: 'beginner',
      path: 'coding',
      audioUrl: 'https://example.com/audio/js-intro.mp3',
      videoUrl: 'https://example.com/video/js-intro.mp4',
      demo: 'code-cell',
    },
  ],
};

export async function getLessonsForPath(path: string): Promise<Lesson[]> {
  const result = lessons[path] || [];
  // Validate each lesson
  return result.filter((lesson) => LessonSchema.safeParse(lesson).success);
}
