// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "AI Mind OS",
  description: "Core app (Workbench + Whiteboard, no 3D)",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="min-h-screen">
        <header className="border-b border-white/10">
          <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
            <div className="font-semibold">AI Mind OS</div>
            <nav className="flex gap-4 text-sm">
              <Link href="/dashboard" className="hover:opacity-80">Dashboard</Link>
              <Link href="/workbench" className="hover:opacity-80">Workbench</Link>
              <Link href="/whiteboard" className="hover:opacity-80">Whiteboard</Link>
              <Link href="/pricing" className="hover:opacity-80">Pricing</Link>
              <a className="hover:opacity-80" href="/api/health" target="_blank">Core Health</a>
              <a className="hover:opacity-80" href="/api/sanity/health" target="_blank">Sanity Health</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-screen-xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
