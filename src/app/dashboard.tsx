import ThemeToggle from "../components/ThemeToggle";

export default function DashboardPage() {
  return (
    <main className="min-h-[100svh] bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(0,255,255,0.18),transparent),radial-gradient(40%_30%_at_110%_10%,rgba(255,0,110,0.14),transparent)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl tracking-wide">
            AI MIND OS <span className="text-brand-accent">Dashboard</span>
          </h1>
          <ThemeToggle />
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="card">
            <h2 className="font-display text-xl mb-2">Core Health</h2>
            <p className="text-sm text-white/70">Systems status snapshot.</p>
            <a className="neon-link mt-3 inline-block" href="/api/health" target="_blank">View JSON</a>
          </div>
          <div className="card">
            <h2 className="font-display text-xl mb-2">Workbench</h2>
            <p className="text-sm text-white/70">3D disabled for now. Quick links.</p>
            <a className="neon-link mt-3 inline-block" href="/workbench">Open Workbench</a>
          </div>
          <div className="card">
            <h2 className="font-display text-xl mb-2">Whiteboard</h2>
            <p className="text-sm text-white/70">Idea boards & AI notes.</p>
            <a className="neon-link mt-3 inline-block" href="/whiteboard">Open Whiteboard</a>
          </div>
        </section>
      </div>
    </main>
  );
}
