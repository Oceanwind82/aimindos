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
