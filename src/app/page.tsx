export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Mind OS 🚀</h1>
      <p className="text-lg text-gray-600 mb-8">Your operating system for dangerous thinkers.</p>
      <a
        href="/signup"
        className="rounded bg-black px-6 py-3 text-white font-semibold text-lg shadow hover:bg-gray-900 transition"
      >
        Request Early Access
      </a>
    </main>
  );
}
