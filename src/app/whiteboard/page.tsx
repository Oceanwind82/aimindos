'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const AIStickyNote = dynamic(() => import('@/components/AIStickyNote'), { ssr: false });

// Dummy AI summarize function (replace with real API call)
async function fakeSummarize(text: string) {
  return `Summary: ${text.slice(0, 40)}...`;
}

const CLUSTERS = ['Ideas', 'Tasks', 'Research'];

export default function WhiteboardPage() {
  // Notes state: each note has text, cluster
  const [notes, setNotes] = useState([
    { id: 1, text: 'Brainstorm your ideas here!', cluster: 'Ideas' },
    { id: 2, text: 'Drop more notes or cluster ideas...', cluster: 'Tasks' },
  ]);

  function handleClusterChange(idx: number, newCluster: string) {
    setNotes((prev) => prev.map((n, i) => (i === idx ? { ...n, cluster: newCluster } : n)));
  }

  function handleAddNote() {
    setNotes((prev) => [...prev, { id: Date.now(), text: '', cluster: '' }]);
  }

  // Group notes by cluster
  const grouped = CLUSTERS.map((c) => ({
    name: c,
    notes: notes.filter((n) => n.cluster === c),
  }));
  const ungrouped = notes.filter((n) => !CLUSTERS.includes(n.cluster));

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutralSilver to-accentGold/20 p-8 flex flex-col items-center">
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
          <img
            src="/avatars/avatar3.png"
            alt="User 3"
            className="w-6 h-6 rounded-full border-2 border-white shadow"
          />
        </div>
        <span className="ml-2 text-xs text-gray-500">+2 more</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Whiteboard</h1>
      <button
        className="mb-6 bg-accentGold text-black font-bold px-4 py-2 rounded-xl shadow border-2 border-accentGold hover:bg-accentCrimson hover:text-neutralSilver transition"
        onClick={handleAddNote}
      >
        + Add Sticky Note
      </button>
      <div className="flex gap-8 flex-wrap w-full justify-center">
        {/* Ungrouped notes */}
        {ungrouped.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-neutralSilver">No Cluster</h2>
            <div className="flex gap-4 flex-wrap">
              {ungrouped.map((n) => (
                <AIStickyNote
                  key={n.id}
                  initialText={n.text}
                  onSummarize={fakeSummarize}
                  cluster={n.cluster}
                  onClusterChange={(c) => handleClusterChange(notes.indexOf(n), c)}
                />
              ))}
            </div>
          </div>
        )}
        {/* Clustered notes */}
        {grouped.map((group) =>
          group.notes.length > 0 ? (
            <div key={group.name}>
              <h2 className="text-lg font-semibold mb-2 text-neutralSilver">{group.name}</h2>
              <div className="flex gap-4 flex-wrap">
                {group.notes.map((n) => (
                  <AIStickyNote
                    key={n.id}
                    initialText={n.text}
                    onSummarize={fakeSummarize}
                    cluster={n.cluster}
                    onClusterChange={(c) => handleClusterChange(notes.indexOf(n), c)}
                  />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
      <p className="mt-8 text-xs text-gray-400">
        (AI clustering, connectors, and media coming soon)
      </p>
    </div>
  );
}
