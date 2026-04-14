import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import AttributeBar from "../components/features/AttributeBar";
import { useAuthStore } from "../store/useAuthStore";
import { getDashboard, type DashboardData } from "../services/progressService";
import { useCountUp } from "../hooks/useCountUp";
import { useStaggered } from "../hooks/useStaggered";

const rankTextColors: Record<string, string> = {
  E: "text-zinc-400",
  D: "text-green-400",
  C: "text-blue-400",
  B: "text-violet-400",
  A: "text-orange-400",
  S: "text-red-400",
};

function StatCard({
  label,
  value,
  suffix = "",
  colorClass = "text-slate-100",
  visible,
}: {
  label: string;
  value: number;
  suffix?: string;
  colorClass?: string;
  visible: boolean;
}) {
  const animated = useCountUp(visible ? value : 0);
  return (
    <Card
      className={`transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
        {label}
      </p>
      <p className={`mt-2 font-mono text-3xl font-bold ${colorClass}`}>
        {animated}
        {suffix}
      </p>
    </Card>
  );
}

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

  const staggered = useStaggered(loading ? 0 : 5);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  const attrs = data?.attributes;
  const next = data?.nextLesson;
  const summary = data?.summary;
  const pct =
    summary && summary.total_lessons > 0
      ? Math.round((summary.completed_lessons / summary.total_lessons) * 100)
      : 0;
  const rank = user?.currentRank ?? "E";

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
        <div
          className={`transition-all duration-300 ease-out ${staggered[0] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <Link to={`/courses/${next.course_id}/lessons/${next.lesson_id}`}>
            <Card variant="highlighted" hoverable>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-violet-400">
                    Próxima missão
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-slate-100">
                    {next.lesson_title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {next.course_title} · {next.module_title}
                  </p>
                </div>
                <ChevronRight size={20} className="text-violet-400" />
              </div>
            </Card>
          </Link>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Rank card — text, not number */}
        <Card
          className={`transition-all duration-300 ease-out ${staggered[1] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
            Rank Atual
          </p>
          <p className={`mt-2 font-mono text-3xl font-bold ${rankTextColors[rank]}`}>
            {rank}-Rank
          </p>
        </Card>

        <StatCard
          label="XP Total"
          value={user?.totalXp ?? 0}
          colorClass="text-slate-100"
          visible={staggered[2] ?? false}
        />
        <StatCard
          label="Progresso"
          value={pct}
          suffix="%"
          colorClass="text-slate-100"
          visible={staggered[3] ?? false}
        />
      </div>

      {/* Attributes */}
      {attrs && (
        <div
          className={`transition-all duration-300 ease-out ${staggered[4] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <Card>
            <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
              Atributos do Hunter
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AttributeBar
                label="Prompt Mastery"
                value={attrs.prompt_mastery}
                colorFrom="from-emerald-600"
                colorTo="to-emerald-400"
                glowColor="rgba(52,211,153,0.3)"
              />
              <AttributeBar
                label="Frontend Power"
                value={attrs.frontend_power}
                colorFrom="from-blue-600"
                colorTo="to-blue-400"
                glowColor="rgba(96,165,250,0.3)"
              />
              <AttributeBar
                label="Backend Strength"
                value={attrs.backend_strength}
                colorFrom="from-orange-600"
                colorTo="to-orange-400"
                glowColor="rgba(251,146,60,0.3)"
              />
              <AttributeBar
                label="DB Knowledge"
                value={attrs.db_knowledge}
                colorFrom="from-cyan-600"
                colorTo="to-cyan-400"
                glowColor="rgba(34,211,238,0.3)"
              />
              <AttributeBar
                label="Security Level"
                value={attrs.security_level}
                colorFrom="from-red-600"
                colorTo="to-red-400"
                glowColor="rgba(248,113,113,0.3)"
              />
              <AttributeBar
                label="Deploy Speed"
                value={attrs.deploy_speed}
                colorFrom="from-violet-600"
                colorTo="to-violet-400"
                glowColor="rgba(167,139,250,0.3)"
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
