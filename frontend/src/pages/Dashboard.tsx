import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import AttributeBar from "../components/features/AttributeBar";
import { useAuthStore } from "../store/useAuthStore";
import { getDashboard, type DashboardData } from "../services/progressService";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
      </div>
    );
  }

  const attrs = data?.attributes;
  const next = data?.nextLesson;
  const summary = data?.summary;
  const pct = summary && summary.total_lessons > 0
    ? Math.round((summary.completed_lessons / summary.total_lessons) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Status Window"
        subtitle={`Bem-vindo, ${user?.name ?? "Hunter"}. Continue sua jornada.`}
        action={
          next ? (
            <Link to={`/courses/${next.course_id}/lessons/${next.lesson_id}`}>
              <Button>Continuar onde parou</Button>
            </Link>
          ) : undefined
        }
      />

      {/* Next lesson card */}
      {next && (
        <Link to={`/courses/${next.course_id}/lessons/${next.lesson_id}`}>
          <Card variant="highlighted" className="transition-transform hover:scale-[1.01]">
            <p className="text-xs font-medium text-violet-400">Proxima missao</p>
            <p className="mt-1 text-lg font-semibold text-zinc-100">{next.lesson_title}</p>
            <p className="mt-1 text-sm text-zinc-500">
              {next.course_title} · {next.module_title}
            </p>
          </Card>
        </Link>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-400">Rank Atual</p>
          <p className="mt-1 text-3xl font-bold text-violet-400">{user?.currentRank ?? "E"}-Rank</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-400">XP Total</p>
          <p className="mt-1 text-3xl font-bold text-zinc-100">{user?.totalXp ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-400">Progresso</p>
          <p className="mt-1 text-3xl font-bold text-zinc-100">{pct}%</p>
          <p className="mt-1 text-xs text-zinc-500">
            {summary?.completed_lessons ?? 0} / {summary?.total_lessons ?? 0} missoes
          </p>
        </Card>
      </div>

      {/* Attributes */}
      {attrs && (
        <Card>
          <h2 className="mb-4 text-sm font-semibold text-zinc-300">Atributos do Hunter</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <AttributeBar label="Prompt Mastery" value={attrs.prompt_mastery} color="bg-emerald-500" />
            <AttributeBar label="Frontend Power" value={attrs.frontend_power} color="bg-blue-500" />
            <AttributeBar label="Backend Strength" value={attrs.backend_strength} color="bg-orange-500" />
            <AttributeBar label="DB Knowledge" value={attrs.db_knowledge} color="bg-cyan-500" />
            <AttributeBar label="Security Level" value={attrs.security_level} color="bg-red-500" />
            <AttributeBar label="Deploy Speed" value={attrs.deploy_speed} color="bg-violet-500" />
          </div>
        </Card>
      )}
    </div>
  );
}
