/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#000', // Black base
        },
      },
      animation: {
        'xp-bar': 'xpBar 2s linear infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        xpBar: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.5)' },
        },
        glitch: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
