import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'src/**/*.test.{ts,tsx}',
      'src/components/**/*.test.{ts,tsx}',
      'src/components/**/*.spec.{ts,tsx}',
    ],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
