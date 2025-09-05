'use client';

import Link from 'next/link';
import Image from 'next/image';
import { plans, featuresMatrix, faqs, testimonials, logos } from '@app/pricing/pricing.data';
import Head from 'next/head';
import { useEffect, useState, useRef, Suspense } from 'react';
import confetti from 'canvas-confetti';
import { useSearchParams } from 'next/navigation';

// Demo modal for plan features (accessible, uses <dialog>)
function PlanDemoModal({
  open,
  onClose,
  planId,
}: Readonly<{ open: boolean; onClose: () => void; planId: string }>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);
  let demoContent;
  if (planId === 'elite') {
    demoContent = (
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-accentCrimson">Elite AI Chat Demo</h3>
        <div className="rounded bg-zinc-900 p-3 text-white text-sm">
          Try chatting with our advanced AI! <span className="italic">(Demo only)</span>
        </div>
        <input
          className="w-full rounded border px-2 py-1 text-black"
          placeholder="Type a message..."
          disabled
        />
        <div className="text-xs text-neutralSilver">Full chat unlocked with Elite.</div>
      </div>
    );
  } else if (planId === 'pro') {
    demoContent = (
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-accentGold">Pro Lesson Preview</h3>
        <div className="rounded bg-white p-3 text-black text-sm">
          Access premium lessons and learning paths.
          <br />
          <span className="italic">(Demo preview)</span>
        </div>
        <button
          className="mt-2 px-3 py-1 rounded bg-accentGold text-black font-semibold focus-visible:ring-2 focus-visible:ring-accentGold focus:outline-none hover:bg-accentCrimson hover:text-neutralSilver transition-colors"
          disabled
          type="button"
          aria-label="Start Lesson (demo only)"
        >
          Start Lesson
        </button>
      </div>
    );
  } else {
    demoContent = (
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-neutralSilver">Free Plan Demo</h3>
        <div className="rounded bg-white p-3 text-black text-sm">
          Try basic features and explore the platform.
          <br />
          <span className="italic">(Demo only)</span>
        </div>
        <button
          className="mt-2 px-3 py-1 rounded bg-neutralSilver text-white font-semibold focus-visible:ring-2 focus-visible:ring-accentGold focus:outline-none hover:bg-accentGold hover:text-black transition-colors"
          disabled
          type="button"
          aria-label="Try Now (demo only)"
        >
          Try Now
        </button>
      </div>
    );
  }
  return (
    <dialog
      ref={dialogRef}
      className="z-50 rounded-2xl shadow-xl p-0 max-w-md w-full bg-white dark:bg-zinc-900"
      aria-modal="true"
      aria-label="Plan Demo"
      onClose={onClose}
    >
      <form method="dialog" className="relative p-6">
        <button
          className="absolute top-2 right-2 text-2xl text-neutralSilver hover:text-accentGold focus:outline-none focus-visible:ring-2 focus-visible:ring-accentGold"
          aria-label="Close demo"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        {demoContent}
      </form>
    </dialog>
  );
}

// Type definitions for local use
// (If you want to share types, move these to pricing.data.ts and export them)
type Plan = {
  id: string;
  name: string;
  caption: string;
  price: number;
  features: readonly string[];
  cta: string;
  checkoutHref: string;
  note?: string;
  popular?: boolean;
};

type FeatureMatrixRow = {
  feature: string;
  availableIn: string[];
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type FAQ = {
  q: string;
  a: string;
};

function ReferralToast() {
  const [showReferralToast, setShowReferralToast] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    if ((searchParams as URLSearchParams).get('ref') === 'success') {
      setShowReferralToast(true);
      const timer = setTimeout(() => setShowReferralToast(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);
  if (!showReferralToast) return null;
  return (
    <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 bg-accentGold text-black font-semibold px-6 py-3 rounded-2xl shadow-lg border-2 border-accentGold animate-fadeIn pointer-events-auto flex items-center gap-2">
      <img src="/confetti-emoji.png" alt="Confetti" className="inline w-5 h-5" />
      <span>
        Referral successful! You’ve unlocked a bonus month of{' '}
        <span className="text-accentCrimson font-bold">Elite</span>.
      </span>
    </div>
  );
}

export default function PricingPage() {
  const [showToast, setShowToast] = useState(true);
  const [copied, setCopied] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoPlan, setDemoPlan] = useState<string | null>(null);
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const referralLink =
    typeof window !== 'undefined' ? `${window.location.origin}/signup?ref=yourcode` : '';
  // Referral input ref for copy-to-clipboard
  const referralInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleCtaClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#E11D48', '#fff', '#000'],
    });
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Suspense>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {/* Plan Demo Modal */}
        <PlanDemoModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          planId={demoPlan || 'free'}
        />

        {/* Referral Success Toast */}
        <ReferralToast />

        {/* Real-time upgrade notification toast */}
        {showToast && (
          <div className="fixed top-8 left-1/2 z-50 -translate-x-1/2 bg-accentGold text-black font-semibold px-6 py-3 rounded-2xl shadow-lg border-2 border-accentGold animate-fadeIn pointer-events-auto flex items-center gap-2">
            <svg
              className="w-5 h-5 text-accentCrimson animate-bounce"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" />
            </svg>
            <span>
              3 users just upgraded to <span className="text-accentCrimson font-bold">Elite</span>{' '}
              in the last hour!
            </span>
          </div>
        )}

        <Head>
          <title>AI Mind OS Pricing | Choose Your Plan</title>
          <meta
            name="description"
            content="Compare AI Mind OS plans. Unlock AI chat, lessons, team features, and more. No hidden fees. Cancel anytime."
          />
          <meta property="og:title" content="AI Mind OS Pricing" />
          <meta
            property="og:description"
            content="Compare AI Mind OS plans. Unlock AI chat, lessons, team features, and more. No hidden fees. Cancel anytime."
          />
          <meta property="og:image" content="/og-image.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://your.app/pricing" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="AI Mind OS Pricing" />
          <meta
            name="twitter:description"
            content="Compare AI Mind OS plans. Unlock AI chat, lessons, team features, and more."
          />
          <meta name="twitter:image" content="/og-image.png" />
        </Head>

        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold sm:text-4xl">Choose your plan</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Billed monthly. Cancel anytime.
          </p>
        </header>

        {/* Pricing grid */}
        <section aria-labelledby="pricing" className="mb-12">
          <h2 id="pricing" className="sr-only">
            Pricing
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p: Plan) => (
              <article
                key={p.id}
                className={[
                  'relative rounded-2xl border shadow-sm bg-white dark:bg-zinc-900 transition-transform duration-300',
                  'hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 hover:border-accentGold hover:ring-2 hover:ring-accentGold',
                  p.popular ? 'ring-2 ring-blue-500' : '',
                  'motion-safe:animate-fadeIn',
                ].join(' ')}
                aria-label={`${p.name} plan`}
              >
                {/* Animated lock badge for Elite plan */}
                {p.id === 'elite' && (
                  <div className="absolute -top-3 right-4 flex items-center gap-1 animate-pulse">
                    <svg
                      className="w-5 h-5 text-accentCrimson"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8zm-3 2h10v6H5v-6z" />
                    </svg>
                    <span className="text-xs font-bold text-accentCrimson bg-white dark:bg-zinc-900 rounded px-2 py-0.5 border border-accentCrimson shadow">
                      Unlockable
                    </span>
                  </div>
                )}
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accentGold px-3 py-1 text-xs font-semibold text-black shadow border border-neutralSilver animate-pulse">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutralSilver group-focus-visible:text-accentGold">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutralSilver/80 dark:text-gray-300">
                    {p.caption}
                  </p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-accentGold">${p.price}</span>
                    <span className="text-sm text-neutralSilver">/mo</span>
                  </div>

                  {/* Feature list */}
                  <ul className="mt-4 space-y-2 text-sm">
                    {p.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-neutralSilver">
                        <span aria-hidden="true">✅</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Plan Demo Button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      className="text-xs underline text-accentGold hover:text-accentCrimson focus-visible:ring-2 focus-visible:ring-accentGold focus:outline-none"
                      onClick={() => {
                        setDemoPlan(p.id);
                        setDemoOpen(true);
                      }}
                      type="button"
                      aria-label={`Try ${p.name} plan demo`}
                    >
                      Try Demo
                    </button>
                  </div>
                  {/* CTA */}
                  <div className="mt-6">
                    <Link
                      href={p.checkoutHref}
                      className={[
                        'group inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold outline-none transition-all duration-200',
                        p.popular
                          ? 'bg-accentGold text-black focus-visible:ring-2 focus-visible:ring-accentGold hover:bg-accentCrimson hover:text-neutralSilver'
                          : 'bg-black text-accentGold border border-accentGold focus-visible:ring-2 focus-visible:ring-accentGold hover:bg-accentGold hover:text-black',
                      ].join(' ')}
                      aria-label={`Choose the ${p.name} plan`}
                    >
                      {p.cta}
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Small print */}
                  <p className="mt-2 text-[12px] text-neutralSilver/70">{p.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section aria-labelledby="compare" className="mb-12">
          <h2 id="compare" className="text-xl font-semibold mb-4">
            Compare plans
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-neutralSilver">
            <table className="min-w-full text-sm">
              <thead className="bg-secondary text-neutralSilver">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Feature</th>
                  {plans.map((p: Plan) => {
                    let thClass = 'px-4 py-3 text-left font-semibold ';
                    if (p.popular) {
                      thClass += 'bg-primary text-accentGold shadow-lg ';
                    } else if (p.id === 'elite') {
                      thClass += 'text-accentCrimson ';
                    } else {
                      thClass += 'text-neutralSilver ';
                    }
                    if (p.id === 'free') {
                      thClass += 'bg-secondary ';
                    }
                    return (
                      <th key={p.id} className={thClass.trim()}>
                        {p.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutralSilver/30">
                {featuresMatrix.map((row: FeatureMatrixRow) => (
                  <tr key={row.feature} className="hover:bg-accentGold/10 transition-colors">
                    <td className="px-4 py-3 font-medium text-neutralSilver">{row.feature}</td>
                    {plans.map((p: Plan) => {
                      let tdClass = 'px-4 py-3 text-center font-semibold ';
                      if (row.availableIn.includes(p.id)) {
                        if (p.popular) {
                          tdClass += 'text-accentGold text-lg animate-pulse ';
                        } else if (p.id === 'elite') {
                          tdClass += 'text-accentCrimson ';
                        } else {
                          tdClass += 'text-neutralSilver ';
                        }
                      } else {
                        tdClass += 'text-neutralSilver/50 ';
                      }
                      return (
                        <td key={p.id} className={tdClass.trim()}>
                          {row.availableIn.includes(p.id) ? '✅' : '—'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Testimonials + trust badges */}
        <section aria-labelledby="trust" className="mb-12">
          <h2 id="trust" className="text-xl font-semibold mb-4 text-neutralSilver">
            Trusted by builders
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t: Testimonial) => (
              <blockquote
                key={t.author}
                className="rounded-2xl border border-neutralSilver bg-secondary p-4 text-sm shadow-sm text-neutralSilver hover:shadow-lg transition-shadow duration-200"
              >
                <p className="italic">“{t.quote}”</p>
                <footer className="mt-3 font-medium">
                  — {t.author}, {t.role}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 opacity-80">
            {logos.map((src: string, i: number) => (
              <div
                key={src + i}
                className="bg-secondary rounded-lg p-2 shadow border border-neutralSilver flex items-center justify-center"
              >
                <Image
                  src={src}
                  alt="Trusted by logo"
                  width={90}
                  height={24}
                  className="h-6 w-auto grayscale contrast-125"
                />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq">
          <h2 id="faq" className="text-xl font-semibold mb-4">
            Frequently asked questions
          </h2>
          <dl className="space-y-4">
            {faqs.map((f: FAQ, i: number) => (
              <>
                <dt key={`dt-${f.q}`}>
                  <button
                    id={`faq-button-${i}`}
                    className="w-full text-left font-medium flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-accentGold transition-colors"
                    aria-expanded={openFaq === i ? 'true' : 'false'}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    type="button"
                    aria-label={`Toggle FAQ: ${f.q}`}
                  >
                    {f.q}
                    <span
                      className={`ml-2 transition-transform ${openFaq === i ? 'rotate-90 text-accentGold' : 'text-neutralSilver'}`}
                    >
                      ▶
                    </span>
                  </button>
                </dt>
                <dd
                  key={`dd-${f.q}`}
                  id={`faq-panel-${i}`}
                  className={`mt-2 text-sm text-gray-700 dark:text-gray-300 transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  aria-labelledby={`faq-button-${i}`}
                >
                  {f.a}
                </dd>
              </>
            ))}
          </dl>
        </section>

        {/* Security & Transparency */}
        <section aria-labelledby="security" className="mb-12">
          <h2 id="security" className="text-xl font-semibold mb-4 text-neutralSilver">
            Your data is safe
          </h2>
          <div className="rounded-2xl border border-neutralSilver bg-secondary p-6 text-neutralSilver flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-medium mb-2">We use industry-leading security:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Supabase for secure authentication & encrypted storage</li>
                <li>Stripe for PCI-compliant payments</li>
                <li>All data encrypted in transit & at rest</li>
                <li>No data ever sold or shared</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 text-xs text-right md:text-left">
              <span className="inline-block bg-accentGold text-black font-semibold rounded px-2 py-1">
                100% GDPR Compliant
              </span>
              <span className="inline-block bg-accentCrimson text-neutralSilver font-semibold rounded px-2 py-1">
                Privacy First
              </span>
            </div>
          </div>
        </section>

        {/* Gamification & Referral Teaser */}
        <section aria-labelledby="engagement" className="mb-12">
          <h2 id="engagement" className="text-xl font-semibold mb-4 text-accentGold">
            Unlock More with Mind Score
          </h2>
          <div className="rounded-2xl border border-accentGold bg-secondary p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-neutralSilver">
            <div>
              <p className="font-medium mb-2 text-accentGold">
                Early members will earn Mind Score & unlock hidden tiers.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Climb the leaderboard for exclusive rewards</li>
                <li>Unlock Elite Mode free for a month by inviting 3 friends</li>
                <li>Special badges for top referrers</li>
              </ul>
              {/* Copy Referral Link */}
              <div className="mt-4 flex items-center gap-2">
                <input
                  ref={referralInputRef}
                  value={referralLink}
                  readOnly
                  className="w-64 px-2 py-1 rounded border border-accentGold bg-white text-black text-xs"
                  aria-label="Your referral link"
                  onFocus={(e) => e.target.select()}
                />
                <button
                  onClick={handleCopyReferral}
                  className="bg-accentGold text-black font-semibold px-3 py-1 rounded shadow hover:bg-accentCrimson hover:text-neutralSilver transition-colors text-xs border border-accentGold focus-visible:ring-2 focus-visible:ring-accentGold focus:outline-none"
                  type="button"
                  aria-label="Copy referral link"
                >
                  Copy Link
                </button>
                {copied && (
                  <span className="ml-2 text-accentGold font-semibold animate-fadeIn">Copied!</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-xs text-right md:text-left mt-4 md:mt-0">
              <span className="inline-block bg-accentCrimson text-neutralSilver font-semibold rounded px-2 py-1">
                Referral Highlight
              </span>
              <span className="inline-block bg-accentGold text-black font-semibold rounded px-2 py-1">
                Leaderboard Coming Soon
              </span>
            </div>
          </div>
        </section>

        {/* Leaderboard Teaser Banner */}
        <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 flex justify-center w-full pointer-events-none">
          <div className="pointer-events-auto bg-black/90 text-accentGold font-semibold px-6 py-2 rounded-xl shadow-lg border-2 border-accentGold flex items-center gap-2 animate-pulse">
            <svg
              className="w-5 h-5 text-accentGold animate-bounce"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm2.93 6.36l-3.39 3.39-1.41-1.41a1 1 0 00-1.42 1.42l2.12 2.12a1 1 0 001.42 0l4.1-4.1a1 1 0 10-1.42-1.42z" />
            </svg>
            <span>
              Leaderboard: <span className="font-bold text-white">@Ava</span> just reached{' '}
              <span className="font-bold text-accentGold">#1</span>! Will you be next?
            </span>
          </div>
        </div>

        {/* Sticky CTA Button */}
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex justify-center w-full pointer-events-none">
          <Link
            href="/auth?plan=free"
            className="pointer-events-auto bg-accentGold text-black font-bold px-8 py-3 rounded-2xl shadow-lg border-2 border-accentGold hover:bg-accentCrimson hover:text-neutralSilver focus-visible:ring-4 focus-visible:ring-accentGold transition-all duration-200 animate-bounce"
            aria-label="Get started for free"
            onClick={handleCtaClick}
          >
            Get Started Free
          </Link>
        </div>

        <footer className="mt-16 text-center text-xs text-neutralSilver opacity-80">
          <Link
            href="/privacy"
            className="underline hover:text-accentGold focus-visible:text-accentGold"
          >
            Privacy Policy
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="/terms"
            className="underline hover:text-accentGold focus-visible:text-accentGold"
          >
            Terms of Service
          </Link>
        </footer>
      </div>
    </Suspense>
  );
}
