module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#000000", // primary black
          accent: "#00FFFF",  // neon cyan
          danger: "#FF006E",  // neon pink/red
          glow: "#7DFFB2"     // greenish glow
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Orbitron", "sans-serif"], // good cyberpunk headline font
      },
      boxShadow: {
        neon: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 110, 0.8)",
      },
    },
  },
  plugins: [],
};
  plugins: [],
};
