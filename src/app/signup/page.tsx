'use client';
import { useState } from 'react';

export default function SignupPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const name = (formData.get('name') as string)?.trim() || null;

    try {
      const res = await fetch('/signup/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Signup failed');
      setStatus('✅ Request received! Check your email for a confirmation link.');
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
    setLoading(false);
    e.currentTarget.reset();
  }

  return (
    <main className="mx-auto max-w-md p-6 space-y-6">
      <h1 className="text-2xl font-bold">Join AI Mind OS</h1>
      <p className="text-sm opacity-80">Get early access + bonuses.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Your name" className="w-full rounded border p-2" />
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full rounded border p-2"
        />
        <button disabled={loading} className="w-full rounded bg-black px-4 py-2 text-white">
          {loading ? 'Submitting...' : 'Request Invite'}
        </button>
      </form>

      {status && (
        <div
          className="text-sm font-medium mt-2 text-center"
          dangerouslySetInnerHTML={{ __html: status }}
        />
      )}

      <p className="text-xs opacity-60">No spam. Unsubscribe anytime.</p>
    </main>
  );
}
