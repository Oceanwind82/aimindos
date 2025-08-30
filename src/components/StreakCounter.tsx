import React from 'react';
import styles from './StreakCounter.module.css';

export interface StreakCounterProps {
  count: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ count }) => {
  return (
    <div className="streak-counter">
      <img
        src="https://twemoji.maxcdn.com/v/latest/svg/1f525.svg"
        alt="fire"
        className={styles['fire-icon']}
      />
      <span>{count} day streak!</span>
    </div>
  );
};
