# AI Mind OS

A modern Next.js, TypeScript, and Tailwind CSS project with full-stack best practices.

## Features

- Next.js 14+
- TypeScript strict mode
- Tailwind CSS
- ESLint & Prettier
- Husky & lint-staged
- Conventional commits
- Storybook for UI components
- Playwright for E2E testing
- Vitest for unit testing
- Zod for validation
- Sentry for error monitoring
- Winston for logging
- Security headers (middleware)
- GitHub Actions CI/CD
- Code coverage (c8)
- Absolute imports & path aliases
- Custom error pages

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `dev`: Start Next.js in development
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint
- `lint:fix`: Run ESLint with auto-fix
- `format`: Run Prettier
- `test`: Run unit tests (Vitest)
- `test:e2e`: Run Playwright E2E tests
- `storybook`: Run Storybook
- `coverage`: Run code coverage

## Environment Variables

See `.env.example` for required variables.

## Contributing

- Use conventional commits
- All code is linted and formatted on commit

## License

MIT

## AI Chat Usage

- Set your OpenAI API key in your environment variables as `OPENAI_API_KEY`.
- The API route `/api/ai/chat` accepts POST requests with a `messages` array (OpenAI chat format).
- Use the `AIChat` React component to add a chat UI to any page:

```tsx
import AIChat from '@/components/AIChat';

export default function Page() {
  return <AIChat />;
}
```
