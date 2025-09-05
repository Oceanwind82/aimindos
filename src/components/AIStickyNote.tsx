import React, { useState } from 'react';

interface AIStickyNoteProps {
  initialText?: string;
  onSummarize?: (text: string) => Promise<string>;
}

export default function AIStickyNote({ initialText = '', onSummarize }: AIStickyNoteProps) {
  const [text, setText] = useState(initialText);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    if (onSummarize) {
      setLoading(true);
      const result = await onSummarize(text);
      setSummary(result);
      setLoading(false);
    }
  }

  return (
    <div className="bg-yellow-100 border-yellow-300 border rounded-xl p-4 shadow-lg w-64 min-h-32 relative">
      <textarea
        className="w-full bg-transparent border-none resize-none outline-none text-sm font-medium"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Type your idea..."
      />
      <button
        className="absolute top-2 right-2 bg-accentGold text-black rounded px-2 py-1 text-xs font-bold shadow hover:bg-accentCrimson hover:text-neutralSilver transition"
        onClick={handleSummarize}
        disabled={loading}
        aria-label="Summarize note"
      >
        {loading ? 'Summarizing...' : 'AI Summarize'}
      </button>
      {summary && (
        <div className="mt-3 p-2 bg-neutralSilver/10 rounded text-xs text-gray-700">
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
}
