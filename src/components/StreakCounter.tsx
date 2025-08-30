import React from 'react';

export interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: Readonly<StreakCounterProps>) {
  return (
    <div className="streak-counter">
      <span>Streak: {streak}</span>
    </div>
  );
}
