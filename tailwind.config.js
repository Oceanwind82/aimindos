const { colors } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors, // include all default colors
        brand: { DEFAULT: "#000000" }, // your custom color
      },
      borderRadius: { '2xl': '1rem' }
    },
  },
  plugins: [],
};
