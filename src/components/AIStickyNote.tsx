import React, { useState } from 'react';

interface AIStickyNoteProps {
  readonly initialText?: string;
  readonly onSummarize?: (text: string) => Promise<string>;
  readonly cluster?: string;
  readonly onClusterChange?: (cluster: string) => void;
}

export default function AIStickyNote({
  initialText = '',
  onSummarize,
  cluster,
  onClusterChange,
}: AIStickyNoteProps) {
  const [text, setText] = useState(initialText);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  async function handleSummarize() {
    if (onSummarize) {
      setLoading(true);
      const result = await onSummarize(text);
      setSummary(result);
      setLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
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
      {/* Cluster selector */}
      {onClusterChange && (
        <select
          className="mt-2 block w-full rounded border border-neutralSilver bg-white text-xs text-gray-700"
          value={cluster || ''}
          onChange={(e) => onClusterChange(e.target.value)}
          aria-label="Select cluster"
        >
          <option value="">No Cluster</option>
          <option value="Ideas">Ideas</option>
          <option value="Tasks">Tasks</option>
          <option value="Research">Research</option>
        </select>
      )}
      {/* Image upload */}
      <label className="block mt-2 text-xs text-gray-700 cursor-pointer">
        <span className="underline hover:text-accentGold">Attach image</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </label>
      {image && (
        <div className="mt-2 flex justify-center">
          <img
            src={image}
            alt="Sticky note attachment"
            className="max-h-32 rounded shadow border border-neutralSilver"
          />
        </div>
      )}
      {summary && (
        <div className="mt-3 p-2 bg-neutralSilver/10 rounded text-xs text-gray-700">
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
}
