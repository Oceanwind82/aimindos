'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const QuickActionBar = dynamic(() => import('@/components/QuickActionBar'), { ssr: false });

export default function WorkbenchPage() {
  const [output, setOutput] = useState<string>('');

  function handleCommand(cmd: string) {
    // Simulate AI tool output
    setOutput(`AI executed: ${cmd}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-accentGold/10 p-8 flex flex-col items-center">
      {/* Real-time presence bar */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"
          title="Live"
        />
        <span className="text-xs font-semibold text-green-700">Live</span>
        <div className="flex -space-x-2 ml-3">
          <img
            src="/avatars/avatar1.png"
            alt="User 1"
            className="w-6 h-6 rounded-full border-2 border-white shadow"
          />
          <img
            src="/avatars/avatar2.png"
            alt="User 2"
            className="w-6 h-6 rounded-full border-2 border-white shadow"
          />
        </div>
        <span className="ml-2 text-xs text-gray-500">+1 more</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Workbench</h1>
      <QuickActionBar onCommand={handleCommand} />
      {output && (
        <div className="mt-6 p-4 bg-white/80 rounded shadow text-black w-full max-w-md">
          {output}
        </div>
      )}
      <p className="mt-8 text-xs text-gray-400">
        (Node automations, sandbox, and dock coming soon)
      </p>
    </div>
  );
}
