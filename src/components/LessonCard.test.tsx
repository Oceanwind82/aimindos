import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LessonCard from './LessonCard';

describe('LessonCard', () => {
  it('renders title and description', () => {
    render(<LessonCard lesson={{ id: 1, title: 'Test', description: 'Desc' }} />);
    expect(screen.getByText('Test')).not.toBeNull();
    expect(screen.getByText('Desc')).not.toBeNull();
  });

  it('renders all advanced lesson features', () => {
    const lesson = {
      id: 2,
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
    render(<LessonCard lesson={lesson} />);
    expect(screen.getByText('Boss Battle: AI Mastery')).not.toBeNull();
    expect(screen.getAllByText((text) => text.includes('AI Grandmaster')).length).toBeGreaterThan(
      0
    );
    expect(
      screen.getAllByText((_, node) =>
        (node?.textContent ?? '').includes('Defeat the AI in a strategic showdown.')
      ).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText((_, element) =>
        element !== null && element.textContent !== null
          ? element.textContent.includes('Build a model that outsmarts the AI.')
          : false
      ).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText((content, element) => element.textContent?.includes('Grandmaster Badge'))
        .length
    ).toBeGreaterThan(0);
    expect(screen.getByText(/Quiz:/)).not.toBeNull();
    expect(screen.getByText('What is the final step in model training?')).not.toBeNull();
    expect(screen.getAllByText('Evaluation').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Deployment').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Data Collection').length).toBeGreaterThan(0);
    expect(screen.getByText('Define "overfitting".')).not.toBeNull();
    expect(screen.getByText('When a model learns noise instead of signal.')).not.toBeNull();
    expect(screen.getByText(/MicroTask:/)).not.toBeNull();
    expect(screen.getByText('Write a summary of your AI journey.')).not.toBeNull();
    expect(screen.getByText(/Feedback:/)).not.toBeNull();
    expect(screen.getByText('Epic finale!')).not.toBeNull();
    expect(screen.getByText('Loved the boss battle.')).not.toBeNull();
  });
});
