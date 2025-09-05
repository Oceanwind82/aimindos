'use client';

import React, { useState } from 'react';
import SkillTree, { SkillNode } from '@/components/SkillTree';
import LessonCard from '@/components/LessonCard';
import ProgressReport from '@/components/ProgressReport';
import FreshLessonBanner from '@/components/FreshLessonBanner';
import Leaderboard from '@/components/Leaderboard';
import RecentActivityFeed from '@/components/RecentActivityFeed';
import { lessons } from '@/lib/lessons';
import ToastNotification from '@/components/ToastNotification';

const skillNodes: SkillNode[] = [
  { id: '1', title: 'Prompt Engineering', tier: 'foundation', unlocked: true, completed: true },
  { id: '2', title: 'Automation Basics', tier: 'foundation', unlocked: true, completed: false },
  {
    id: '3',
    title: 'Prompt Chaining',
    tier: 'expansion',
    unlocked: true,
    completed: false,
    children: ['4'],
    isNew: true,
  },
  { id: '4', title: 'Monetization', tier: 'expansion', unlocked: false, completed: false },
  { id: '5', title: 'Portfolio Project', tier: 'mastery', unlocked: false, completed: false },
];

const weeklyChallenges = [
  'Automate Your Morning',
  'Build a Money Bot',
  'Craft a Viral Prompt Pack',
];

// Simulate a trending lesson (first lesson, marked as new if updated in last 24h)
const trendingLesson = lessons[0];
const trendingIsNew = true; // In real app, check updatedAt timestamp

// Mock leaderboard and activity data
const leaderboardEntries = [
  { name: 'Alex', xp: 1200, streak: 7, avatarUrl: '/avatars/avatar1.png' },
  { name: 'Jordan', xp: 950, streak: 5, avatarUrl: '/avatars/avatar2.png' },
  { name: 'Taylor', xp: 800, streak: 3, avatarUrl: '/avatars/avatar3.png' },
];
const activityItems = [
  {
    user: 'Alex',
    action: 'completed Prompt Chaining',
    time: '2m ago',
    avatarUrl: '/avatars/avatar1.png',
  },
  {
    user: 'Jordan',
    action: 'won a Daily Duel',
    time: '10m ago',
    avatarUrl: '/avatars/avatar2.png',
  },
  { user: 'Taylor', action: 'earned a badge', time: '1h ago', avatarUrl: '/avatars/avatar3.png' },
];

export default function SkillTreeDemoPage() {
  const [selectedId, setSelectedId] = useState<string>('1');
  const [challengeIdx] = useState(0);
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);
  const [duelOpen, setDuelOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'info' | 'warning' | 'error';
  } | null>(null);
  const streak = 3;
  const progress = 40;
  const masteredSkills = ['Prompt Engineering'];
  const nextUnlock = 'Prompt Chaining';

  function handleSelectNode(id: string) {
    setSelectedId(id);
    if (id === '3') setUnlockMessage('You unlocked Prompt Chaining!');
  }

  const lesson = Array.isArray(lessons) ? lessons.find((l) => String(l.id) === selectedId) : null;

  // Show streak encouragement on mount
  React.useEffect(() => {
    setTimeout(() => {
      setToast({ message: `🔥 You're on a ${streak}-day streak! Keep going!`, type: 'success' });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutralSilver to-accentGold/10 p-8">
      <FreshLessonBanner
        title={trendingLesson.title}
        description={trendingLesson.description}
        isNew={trendingIsNew}
        onClick={() => setSelectedId(String(trendingLesson.id))}
      />
      <ProgressReport masteredSkills={masteredSkills} streak={streak} nextUnlock={nextUnlock} />
      <SkillTree
        nodes={skillNodes}
        selectedId={selectedId}
        onSelectNode={handleSelectNode}
        weeklyChallenge={weeklyChallenges[challengeIdx]}
        streak={streak}
        progress={progress}
        unlockMessage={unlockMessage}
      />
      <div className="mt-10 max-w-2xl mx-auto">
        {lesson ? (
          <>
            <LessonCard lesson={lesson} />
            <div className="flex justify-center mt-6">
              <button
                className="bg-accentCrimson text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-accentGold hover:text-black transition"
                onClick={() => setDuelOpen(true)}
              >
                Daily Duel
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Select a skill node to view the lesson.</p>
        )}
      </div>
      {/* Leaderboard and Activity Feed */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start mt-12">
        <Leaderboard entries={leaderboardEntries} />
        <RecentActivityFeed items={activityItems} />
      </div>
      {duelOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs text-center">
            <h4 className="text-lg font-bold mb-2 text-accentCrimson">Daily Duel</h4>
            <p className="text-neutralSilver mb-4">
              Challenge a peer or AI to a timed micro-quiz! (Coming soon)
            </p>
            <button
              className="bg-accentGold text-black font-bold px-4 py-2 rounded-xl shadow hover:bg-accentCrimson hover:text-neutralSilver transition"
              onClick={() => {
                setDuelOpen(false);
                setToast({ message: '🎉 You completed a Daily Duel! +20 XP', type: 'success' });
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type ?? 'info'}
          onClose={() => setToast(null)}
        />
      )}
      <div className="mt-8 text-center text-xs text-gray-400">
        Progress: <span className="font-bold">2/5 nodes completed</span> | Streak:{' '}
        <span className="font-bold">3 days</span>
      </div>
    </div>
  );
}
