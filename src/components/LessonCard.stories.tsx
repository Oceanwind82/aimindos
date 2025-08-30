import React from 'react';
import LessonCard from './LessonCard';

export default {
  title: 'Components/LessonCard',
  component: LessonCard,
};

const fullLesson = {
  id: 99,
  title: 'Boss Battle: AI Mastery',
  description: 'Complete all challenges to earn your badge.',
  hook: 'Ready to face the ultimate AI challenge?',
  storyline: 'Final Chapter: The AI Arena. You must use everything you have learned.',
  creatorMode: true,
  feedback: [
    { userId: 'userA', comment: 'Epic finale!', rating: 5 },
    { userId: 'userB', comment: 'Loved the boss battle.', rating: 4 },
  ],
  mentor: 'sage' as const,
  bossBattle: {
    title: 'AI Grandmaster',
    description: 'Defeat the AI in a strategic showdown.',
    challenge: 'Build a model that outsmarts the AI.',
    reward: 'Grandmaster Badge',
  },
  quiz: [
    {
      id: 1,
      type: 'multiple-choice' as const,
      question: 'What is the final step in model training?',
      options: ['Evaluation', 'Deployment', 'Data Collection'],
      answer: 'Evaluation',
    },
    {
      id: 2,
      type: 'flashcard' as const,
      question: 'Define "overfitting".',
      answer: 'When a model learns noise instead of signal.',
    },
  ],
  microTask: {
    id: 1,
    description: 'Write a summary of your AI journey.',
  },
  difficulty: 'advanced' as const,
  path: 'ai',
  audioUrl: 'https://example.com/audio/boss-battle.mp3',
  videoUrl: 'https://example.com/video/boss-battle.mp4',
  demo: 'ai-boss-demo',
};

export const FullFeature = () => <LessonCard lesson={fullLesson} />;
