export const plans = [
  {
    id: 'free',
    name: 'Starter',
    caption: 'Kick the tires, no credit card',
    price: 0,
    cta: 'Get started',
    checkoutHref: '/auth?plan=free',
    note: 'Includes community access.',
    popular: false,
    features: ['Basic lessons', 'AI chat (rate limited)', 'Community access', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    caption: 'Everything you need to level up',
    price: 29,
    cta: 'Choose Pro',
    checkoutHref: '/checkout?plan=pro',
    note: '14-day money-back guarantee.',
    popular: true,
    features: [
      'All Starter features',
      'Unlimited AI chat',
      'Path selector + quizzes',
      'Streaks + XP + progress',
      'Priority support',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    caption: 'For power users and teams',
    price: 99,
    cta: 'Go Elite',
    checkoutHref: '/checkout?plan=elite',
    note: 'Includes early access features.',
    popular: false,
    features: [
      'All Pro features',
      'Team seats (5 included)',
      'Advanced analytics',
      'Premium templates',
      'VIP support',
    ],
  },
] as const;

export const featuresMatrix = [
  { feature: 'Lessons', availableIn: ['free', 'pro', 'elite'] },
  { feature: 'Unlimited AI chat', availableIn: ['pro', 'elite'] },
  { feature: 'Team seats', availableIn: ['elite'] },
  { feature: 'Analytics dashboard', availableIn: ['elite'] },
  { feature: 'Priority/VIP support', availableIn: ['pro', 'elite'] },
];

export const testimonials = [
  {
    quote: 'I shipped my first AI automation in a weekend.',
    author: 'Jordan P.',
    role: 'Solo dev',
  },
  { quote: 'The Pro plan paid for itself in a week.', author: 'Riley C.', role: 'Founder' },
  { quote: 'Clean UI, great lessons, easy to integrate.', author: 'Sam K.', role: 'Product eng' },
];

export const logos = ['/logo.svg', '/logo.svg', '/logo.svg'];

export const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes. There are no contracts or hidden fees.' },
  { q: 'Do you offer refunds?', a: 'We have a 14-day money-back guarantee on paid tiers.' },
  { q: 'Is there a team plan?', a: 'Yes — Elite includes 5 seats and you can add more.' },
  { q: 'Do you have a free plan?', a: 'Yep. Start on Starter and upgrade when ready.' },
];
