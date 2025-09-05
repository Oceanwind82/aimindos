async function sanityHealth() {
  const res = await fetch(`/api/sanity/health`, { cache: 'no-store' });
  return res.json();
}

export default async function Page() {
  const health = await sanityHealth();

  return (
    <section>
      <h1>Sanity Home</h1>
      <pre className="bg-zinc-900 text-gray-100 p-3 rounded-lg">
        {JSON.stringify(health, null, 2)}
      </pre>
      <p>
        {health.ok
          ? '✅ Sanity environment looks good.'
          : '⚠️ Sanity env vars missing. Add SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN.'}
      </p>
    </section>
  );
}
