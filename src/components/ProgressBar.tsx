import React from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  value: number;
}

function getProgressClass(value: number) {
  const rounded = Math.round(value / 5) * 5;
  return styles[`progress${rounded}`] || styles['progress0'];
}

export default function ProgressBar({ value }: Readonly<ProgressBarProps>) {
  return (
    <div className={styles['progress-bar']}>
      <div className={styles['progress-bar__fill'] + ' ' + getProgressClass(value)} />
      <span>{value}%</span>
    </div>
  );
}
