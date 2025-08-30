'use client';
import React, { useState } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setReply(data.reply?.content || '');
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl bg-white dark:bg-black">
      <h2 className="text-lg font-semibold mb-2">AI Chat</h2>
      <form onSubmit={sendMessage} className="flex gap-2 mb-2">
        <input
          className="flex-1 border rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          Send
        </button>
      </form>
      {reply && <div className="p-2 bg-gray-100 rounded">{reply}</div>}
    </div>
  );
}
