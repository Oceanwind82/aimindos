async function getHealth() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/core/health`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function Page() {
  const data = await getHealth();
  return (
    <section>
      <h1>Core Health</h1>
      <pre className="core-health-pre">{JSON.stringify(data, null, 2)}</pre>
      <p>
        {data.ok
          ? '✅ All required environment variables are set.'
          : '⚠️ Some environment variables are missing. Add them in Vercel and .env.local.'}
      </p>
    </section>
  );
}
