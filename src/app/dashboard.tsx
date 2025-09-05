import ProgressWidget from '@/components/ProgressWidget';
import { useUser } from '@/hooks/useUser';

export default function DashboardPage() {
  const { user, loading, error } = useUser();
  if (loading) return <div>Loading dashboard…</div>;
  if (error || !user) return <div className="text-red-600">Unable to load user data.</div>;
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <ProgressWidget userId={user.id} />
      {/* ...other dashboard content... */}
    </main>
  );
}
