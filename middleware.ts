import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOW = [/^\/signup$/, /^\/favicon\.ico$/, /^\/robots\.txt$/, /^\/_next\//, /^\/assets\//];

export function middleware(req: NextRequest) {
  // Disable gate by unsetting SOFT_LAUNCH or setting to "0"
  if (!process.env.NEXT_PUBLIC_SOFT_LAUNCH || process.env.NEXT_PUBLIC_SOFT_LAUNCH === '0') {
    return NextResponse.next();
  }

  // Allow special preview cookie to bypass gate
  if (req.cookies.get('preview')?.value === process.env.PREVIEW_COOKIE_VALUE) {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  const ok = ALLOW.some((re) => re.test(pathname));
  return ok ? NextResponse.next() : NextResponse.redirect(new URL('/signup', req.url));
}

export const config = {
  matcher: ['/((?!api/telegram/webhook).*)'], // don’t break your webhook
};
