import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#000000" }, // on-brand black
      },
      borderRadius: { '2xl': '1rem' }
    },
  },
  plugins: [],
} satisfies Config;
