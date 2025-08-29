export default function Pricing() {
  const tiers = [
    { name: "Free", price: "$0" },
    { name: "Pro", price: "$29.99" },
    { name: "Elite", price: "$59.99" },
    { name: "Mastermind", price: "$99.99" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {tiers.map(t => (
        <div key={t.name} className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow">
          <div className="text-xl font-semibold">{t.name}</div>
          <div className="text-3xl mt-1">{t.price}</div>
          <button className="mt-4 w-full inline-flex items-center justify-center rounded-xl px-4 py-2 border border-white/10 hover:bg-white/10">
            Choose {t.name}
          </button>
        </div>
      ))}
    </div>
  );
}
