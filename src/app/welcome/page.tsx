'use client';

import Link from 'next/link';
import { useState } from 'react';

const steps = [
  { label: 'Choose a plan', done: true },
  { label: 'Sign up & verify email', done: false },
  { label: 'Complete onboarding tour', done: false },
  { label: 'Achieve your first Mind Score', done: false },
];

export default function WelcomePage() {
  const [current, setCurrent] = useState(1);
  return (
    <main className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-accentGold">Welcome to AI Mind OS!</h1>
      <p className="mb-8 text-neutralSilver">
        Let&apos;s get you set up for success in under 5 minutes.
      </p>
      <ol className="space-y-4">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-3">
            <span
              className={[
                i < current ? 'bg-accentGold text-black' : '',
                i === current ? 'bg-accentCrimson text-white animate-pulse' : '',
                i > current ? 'bg-neutralSilver text-white' : '',
                'w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg',
              ].join(' ')}
            >
              {i < current ? '✓' : i + 1}
            </span>
            <span
              className={i === current ? 'font-semibold text-accentCrimson' : 'text-neutralSilver'}
            >
              {step.label}
            </span>
            {i === current && (
              <button
                type="button"
                className="ml-4 px-3 py-1 rounded bg-accentGold text-black font-semibold text-xs shadow hover:bg-accentCrimson hover:text-white transition-colors"
                onClick={() => setCurrent(current + 1)}
                disabled={current >= steps.length - 1}
              >
                Complete Step
              </button>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-10 text-center">
        <Link
          href="/dashboard"
          className="inline-block bg-accentGold text-black font-bold px-6 py-3 rounded-2xl shadow-lg border-2 border-accentGold hover:bg-accentCrimson hover:text-neutralSilver focus-visible:ring-4 focus-visible:ring-accentGold transition-all duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
