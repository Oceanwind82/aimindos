import dynamic from 'next/dynamic';
import React from 'react';

const AIStickyNote = dynamic(() => import('@/components/AIStickyNote'), { ssr: false });

// Dummy AI summarize function (replace with real API call)
async function fakeSummarize(text: string) {
  return `Summary: ${text.slice(0, 40)}...`;
}

export default function WhiteboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutralSilver to-accentGold/20 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Whiteboard</h1>
      <div className="flex gap-8 flex-wrap">
        <AIStickyNote initialText="Brainstorm your ideas here!" onSummarize={fakeSummarize} />
        <AIStickyNote
          initialText="Drop more notes or cluster ideas..."
          onSummarize={fakeSummarize}
        />
      </div>
      <p className="mt-8 text-xs text-gray-400">
        (AI clustering, connectors, and media coming soon)
      </p>
    </div>
  );
}
