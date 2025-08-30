export default function LessonCard({ lesson }: { readonly lesson: any }) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white dark:bg-black">
      <h2 className="text-lg font-semibold">{lesson.title}</h2>
      <p className="text-sm opacity-80">{lesson.description}</p>
    </div>
  );
}
