import React from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: Readonly<ProgressBarProps>) {
  return (
    <div className={styles['progress-bar']}>
      <div
        className={styles['progress-bar__fill']}
        style={{ ['--progress-width' as any]: `${value}%` }}
      />
      <span>{value}%</span>
    </div>
  );
}
