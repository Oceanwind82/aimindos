'use client';
import { useRealtimeProgress } from '@/hooks/useRealtimeProgress';
import styles from './ProgressWidget.module.css';

export default function ProgressWidget({ userId }: Readonly<{ userId: string }>) {
  const rows = useRealtimeProgress(userId);
  const total = rows.length;
  const completed = rows.filter((r) => r.completed).length;
  const percent = total ? (completed / total) * 100 : 0;

  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm opacity-70">Your Progress</div>
      <div className="text-2xl font-semibold">
        {completed} / {total} lessons
      </div>
      <div className="mt-2 h-2 w-full rounded bg-black/10">
        <div className={styles.progressBar} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
