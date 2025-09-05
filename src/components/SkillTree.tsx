import React from 'react';
import './SkillTree.css';

export type SkillNode = {
  id: string;
  title: string;
  tier: 'foundation' | 'expansion' | 'mastery';
  unlocked: boolean;
  completed: boolean;
  children?: string[];
  isNew?: boolean;
};

export type SkillTreeProps = {
  nodes: SkillNode[];
  onSelectNode?: (id: string) => void;
  selectedId?: string;
  weeklyChallenge?: string;
  streak?: number;
  progress?: number; // percent
  unlockMessage?: string | null;
};

const tierColors = {
  foundation: 'bg-accentGold',
  expansion: 'bg-accentCrimson',
  mastery: 'bg-primary',
};

export const SkillTree: React.FC<SkillTreeProps> = ({
  nodes,
  onSelectNode,
  selectedId,
  weeklyChallenge,
  streak = 0,
  progress = 0,
  unlockMessage,
}) => {
  // Group nodes by tier
  const tiers = ['foundation', 'expansion', 'mastery'] as const;
  const grouped = tiers.map((tier) => ({
    tier,
    nodes: nodes.filter((n) => n.tier === tier),
  }));

  return (
    <>
      <div className="w-full max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Skill Tree</h2>
        {/* Streak & Progress Bar */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-xs text-accentGold font-bold">Streak: {streak} days</span>
          <label htmlFor="skilltree-progress" className="sr-only">
            Progress
          </label>
          <progress
            id="skilltree-progress"
            className="w-40 h-3 rounded-full overflow-hidden skilltree-progress-bar"
            value={progress}
            max={100}
            aria-label="Progress"
          />
        </div>
        <span className="text-xs text-neutralSilver font-bold">{progress}%</span>
        <div className="flex flex-col gap-8">
          {grouped.map((group) => (
            <div key={group.tier}>
              <h3 className={`text-lg font-semibold mb-2 capitalize ${tierColors[group.tier]}`}>
                {group.tier}
              </h3>
              <div className="flex gap-4 flex-wrap justify-center">
                {group.nodes.map((node) => (
                  <button
                    key={node.id}
                    className={`relative rounded-xl px-4 py-3 shadow border-2 transition-all duration-200 text-sm font-bold focus-visible:ring-2 focus-visible:ring-accentGold
                      ${tierColors[node.tier]} 
                      ${node.unlocked ? 'opacity-100' : 'opacity-40'}
                      ${node.completed ? 'ring-2 ring-green-500' : ''}
                      ${selectedId === node.id ? 'scale-105 border-accentGold' : 'border-neutralSilver'}
                    `}
                    disabled={!node.unlocked}
                    onClick={() => onSelectNode?.(node.id)}
                    aria-label={node.title + (node.completed ? ' (completed)' : '')}
                  >
                    {node.title}
                    {node.completed && <span className="ml-2 text-green-600">✓</span>}
                    {node.isNew && (
                      <span className="absolute -top-2 -right-2 bg-accentCrimson text-white text-[10px] px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Weekly Challenge */}
        <div className="mt-8 text-xs text-center text-gray-500">
          <strong>Weekly Challenge:</strong>{' '}
          <span>{weeklyChallenge || 'Automate Your Morning'}</span> |{' '}
          <span>Dynamic updates coming soon!</span>
        </div>
      </div>
      {/* Unlock Modal */}
      {unlockMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs text-center">
            <h4 className="text-lg font-bold mb-2 text-accentGold">Unlocked!</h4>
            <p className="text-neutralSilver mb-4">{unlockMessage}</p>
            <button
              className="bg-accentGold text-black font-bold px-4 py-2 rounded-xl shadow hover:bg-accentCrimson hover:text-neutralSilver transition"
              onClick={() => window.location.reload()}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SkillTree;
