import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow">
        <h1 className="text-3xl font-bold">AI Mind OS</h1>
        <p className="mt-2 text-white/70">
          Workbench + Whiteboard build (no 3D). Use the quick links to jump in.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link className="underline hover:opacity-80" href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="underline hover:opacity-80" href="/workbench">
              Workbench
            </Link>
          </li>
          <li>
            <Link className="underline hover:opacity-80" href="/whiteboard">
              Whiteboard
            </Link>
          </li>
          <li>
            <Link className="underline hover:opacity-80" href="/pricing">
              Pricing
            </Link>
          </li>
          <li>
            <a className="underline hover:opacity-80" href="/api/health" target="_blank" rel="noopener noreferrer">
              Core Health JSON
            </a>
          </li>
          <li>
            <a className="underline hover:opacity-80" href="/api/sanity/health" target="_blank" rel="noopener noreferrer">
              Sanity Health JSON
            </a>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow">
        <h2 className="text-xl font-semibold">Getting Started</h2>
        <ol className="list-decimal ml-5 mt-2 space-y-1 text-white/80">
          <li>Set your <code>.env.local</code> (Sanity, etc.).</li>
          <li>Run <code>npm run dev</code>.</li>
          <li>Open Workbench &amp; Whiteboard.</li>
        </ol>
      </section>
    </div>
  );
}
