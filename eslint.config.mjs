// eslint.config.mjs (flat config)
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // 🚫 Ignore generated + external stuff
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/public/**",
      "**/dist/**",
      "**/.vercel/**",
      "**/*.d.ts",
      // ignore test files to avoid blocking builds (optional)
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/__tests__/**",
    ],
  },
  // ✅ App source rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: false,
      },
    },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      // Keep this practical; you can tighten later
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-this-alias": "off",
    },
  },
];
