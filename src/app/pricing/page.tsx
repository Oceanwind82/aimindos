import Link from 'next/link';
import Image from 'next/image';
import { plans, featuresMatrix, faqs, testimonials, logos } from '@app/pricing/pricing.data';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

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

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
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
          Simple pricing. No hidden fees. Cancel anytime.
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
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accentGold px-3 py-1 text-xs font-semibold text-black shadow border border-neutralSilver animate-pulse">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-neutralSilver group-focus-visible:text-accentGold">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-neutralSilver/80 dark:text-gray-300">{p.caption}</p>

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
          {faqs.map((f: FAQ) => (
            <div key={f.q} className="rounded-2xl border p-4">
              <dt className="font-medium">{f.q}</dt>
              <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">{f.a}</dd>
            </div>
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

      {/* Sticky CTA Button */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex justify-center w-full pointer-events-none">
        <Link
          href="/auth?plan=free"
          className="pointer-events-auto bg-accentGold text-black font-bold px-8 py-3 rounded-2xl shadow-lg border-2 border-accentGold hover:bg-accentCrimson hover:text-neutralSilver focus-visible:ring-4 focus-visible:ring-accentGold transition-all duration-200 animate-bounce"
          aria-label="Get started for free"
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

      <Analytics />
    </div>
  );
}
