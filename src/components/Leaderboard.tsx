import React from 'react';

export interface LeaderboardEntry {
  name: string;
  xp: number;
  streak: number;
  avatarUrl?: string;
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => (
  <div className="bg-white/80 rounded-2xl shadow p-6 mb-6 max-w-xs mx-auto">
    <h3 className="text-lg font-bold text-accentGold mb-4 text-center">Leaderboard</h3>
    <ol className="list-decimal pl-4">
      {entries.map((entry, i) => (
        <li key={entry.name} className="flex items-center gap-2 mb-2">
          {entry.avatarUrl && (
            <img src={entry.avatarUrl} alt={entry.name} className="w-6 h-6 rounded-full border" />
          )}
          <span className="font-semibold">{entry.name}</span>
          <span className="ml-auto text-xs text-accentGold">{entry.xp} XP</span>
          <span className="ml-2 text-xs text-green-600">🔥{entry.streak}</span>
          {i === 0 && (
            <span className="ml-2 bg-accentGold text-black text-[10px] px-2 py-0.5 rounded-full">
              #1
            </span>
          )}
        </li>
      ))}
    </ol>
  </div>
);

export default Leaderboard;
