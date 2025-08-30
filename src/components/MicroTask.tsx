import React from 'react';
import type { MicroTask } from '@/lib/lessons';

export default function MicroTask({ task }: { readonly task: MicroTask }) {
  return (
    <div className="p-2 border rounded bg-yellow-50 dark:bg-yellow-900 mt-4">
      <div className="font-semibold mb-1">Micro-Task</div>
      <div>{task.description}</div>
    </div>
  );
}
