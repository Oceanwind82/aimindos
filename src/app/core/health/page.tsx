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
      <pre style={{ background: '#111', color: '#eee', padding: 12, borderRadius: 8 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
      <p>
        {data.ok
          ? '✅ All required environment variables are set.'
          : '⚠️ Some environment variables are missing. Add them in Vercel and .env.local.'}
      </p>
    </section>
  );
}
