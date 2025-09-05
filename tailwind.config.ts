import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#000000' }, // on-brand black
        primary: '#000000',
        secondary: '#2C2C2C',
        accentGold: '#FFD700',
        accentCrimson: '#DC143C',
        neutralSilver: '#9CA3AF',
      },
      borderRadius: { '2xl': '1rem' },
    },
  },
  plugins: [],
} satisfies Config;
