'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function LessonListClient() {
  const { data, isLoading } = useSWR('/api/lessons', fetcher, {
    refreshInterval: 30000, // poll every 30s
    revalidateOnFocus: true, // also when tab refocuses
  });

  if (isLoading) return <p>Loading…</p>;
  const lessons = data?.lessons ?? [];

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lessons.map((l: any) => (
        <li key={l._id} className="rounded-2xl border p-4">
          <h2 className="text-lg font-medium">{l.title}</h2>
          <p className="text-sm opacity-80">{l.summary}</p>
        </li>
      ))}
    </ul>
  );
}
