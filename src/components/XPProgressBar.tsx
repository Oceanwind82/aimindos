// src/components/XPProgressBar.tsx
import React from 'react';
import styles from './xpProgressBar.module.css';

interface XPProgressBarProps {
  readonly xp: number;
  readonly maxXp: number;
}

export default function XPProgressBar({ xp, maxXp }: XPProgressBarProps) {
  const percent = Math.min(100, (xp / maxXp) * 100);
  return (
    <div className="w-full bg-black rounded-lg p-2 shadow-lg border-2 border-gray-800 relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-600 to-blue-600 opacity-30 pointer-events-none ${styles.glitch}`}
      />
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-white tracking-wide">XP</span>
          <span className="text-xs font-bold text-white">
            {xp} / {maxXp}
          </span>
        </div>
        <div className="w-full h-4 bg-gray-900 rounded-full overflow-hidden">
          <div
            className={[
              'h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500',
              styles.xpBar,
              styles['xpBarWidth' + Math.round(percent)],
            ].join(' ')}
          />
        </div>
      </div>
    </div>
  );
}
