import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#000000",
          accent: "#00FFFF",
          danger: "#FF006E",
          glow: "#7DFFB2",
          ink: "#0A0A0A",
          paper: "#0F0F10",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-orbitron)"],
      },
      boxShadow: {
        neon: "0 0 10px rgba(0,255,255,.6), 0 0 20px rgba(255,0,110,.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
