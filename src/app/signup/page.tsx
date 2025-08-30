'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function SignupPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const name = (formData.get('name') as string)?.trim() || null;

    const { data, error } = await supabase.from('waitlist').insert({ email, name }).select();
    if (error || !data || !data[0]) {
      setStatus(`❌ ${error?.message || 'Signup failed'}`);
      setLoading(false);
      return;
    }
    // Generate confirmation link (demo: show to user)
    const confirmUrl = `${window.location.origin}/api/signup/confirm?id=${data[0].id}&token=dummy`;
    setStatus(
      `✅ Request received! Check your email and click to confirm: ` +
        `<a href='${confirmUrl}' target='_blank' class='underline'>Confirm your signup</a>`
    );
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
