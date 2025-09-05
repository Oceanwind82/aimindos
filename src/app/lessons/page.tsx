import LessonListClient from '@/components/LessonListClient';
import { Suspense } from 'react';

export default async function LessonsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lessons</h1>
      {/* Server-rendered lessons here if desired */}
      <div className="mt-8">
        <Suspense fallback={<div>Loading lessons…</div>}>
          <LessonListClient />
        </Suspense>
      </div>
    </main>
  );
}
