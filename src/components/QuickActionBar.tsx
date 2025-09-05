import React, { useState } from 'react';

const AI_COMMANDS = [
  { label: 'Generate Code', value: '/generate' },
  { label: 'Analyze', value: '/analyze' },
  { label: 'Summarize', value: '/summarize' },
  { label: 'Refactor', value: '/refactor' },
  { label: 'Explain', value: '/explain' },
];

export default function QuickActionBar({
  onCommand,
}: {
  readonly onCommand: (cmd: string) => void;
}) {
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState(AI_COMMANDS);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInput(val);
    setShow(val.startsWith('/'));
    setFiltered(
      AI_COMMANDS.filter(
        (cmd) => cmd.value.includes(val) || cmd.label.toLowerCase().includes(val.toLowerCase())
      )
    );
  }

  function handleSelect(cmd: string) {
    setInput(cmd);
    setShow(false);
    onCommand(cmd);
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-accentGold focus:border-accentGold"
        placeholder="Type '/' for AI actions..."
        value={input}
        onChange={handleInput}
        onFocus={() => setShow(input.startsWith('/'))}
        onBlur={() => setTimeout(() => setShow(false), 100)}
      />
      {show && (
        <ul className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 z-50">
          {filtered.length === 0 && <li className="p-2 text-gray-400">No commands</li>}
          {filtered.map((cmd) => (
            <li key={cmd.value} className="p-2">
              <button
                className="w-full text-left hover:bg-accentGold hover:text-black cursor-pointer text-sm rounded px-2 py-1"
                onMouseDown={() => handleSelect(cmd.value)}
                tabIndex={0}
                type="button"
              >
                {cmd.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
