import './globals.css';
import Link from 'next/link';
import { Inter, Orbitron } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata = {
  title: 'AI Mind OS',
  description: 'Dashboard · AI Mind OS',
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className={`min-h-screen bg-brand text-white ${inter.variable} ${orbitron.variable}`}>
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
          <div className="font-display font-semibold text-lg tracking-wide">AI Mind OS</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/dashboard" className="hover:opacity-80">
              Dashboard
            </Link>
            <Link href="/workbench" className="hover:opacity-80">
              Workbench
            </Link>
            <Link href="/whiteboard" className="hover:opacity-80">
              Whiteboard
            </Link>
            <Link href="/pricing" className="hover:opacity-80">
              Pricing
            </Link>
            <a
              className="hover:opacity-80"
              href="/api/health"
              target="_blank"
              rel="noopener noreferrer"
            >
              Core Health
            </a>
            <a
              className="hover:opacity-80"
              href="/api/sanity/health"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sanity Health
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-screen-xl px-4 py-6">{children}</main>
    </div>
  );
}
