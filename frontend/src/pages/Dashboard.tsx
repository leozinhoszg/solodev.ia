import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import PageHero from "../components/layout/PageHero";
import AttributeBar from "../components/features/AttributeBar";
import BadgeCard from "../components/features/BadgeCard";
import QuestItem from "../components/features/QuestItem";
import StreakCounter from "../components/features/StreakCounter";
import { useAuthStore } from "../store/useAuthStore";
import { getDashboard, type DashboardData } from "../services/progressService";
import { getGamificationData, type GamificationData } from "../services/gamificationService";
import { useCountUp } from "../hooks/useCountUp";
import { staggerCards } from "../lib/animations";

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
}: {
  label: string;
  value: number;
  suffix?: string;
  colorClass?: string;
}) {
  const animated = useCountUp(value);
  return (
    <Card variant="glass" rim className="dashboard-card">
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
  const [gamData, setGamData] = useState<GamificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([getDashboard(), getGamificationData()])
      .then(([d, g]) => {
        setData(d);
        setGamData(g);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      staggerCards(".dashboard-card", { delay: 0.2, stagger: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-40 w-full rounded-3xl" />
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
    <div ref={containerRef} className="flex flex-col gap-8">
      <PageHero
        eyebrow="Status Window"
        title={
          <>
            Olá, {user?.name?.split(" ")[0] ?? "Hunter"}
            <span className="text-violet-400">.</span>
          </>
        }
        subtitle="Continue sua jornada e desbloqueie novas habilidades no caminho de Solo Dev."
        cta={
          next
            ? {
                label: "Continuar onde parou",
                href: `/courses/${next.course_id}/lessons/${next.lesson_id}`,
              }
            : undefined
        }
        planet="violet"
      />

      {/* Next lesson card */}
      {next && (
        <Link
          to={`/courses/${next.course_id}/lessons/${next.lesson_id}`}
          className="dashboard-card block"
        >
          <Card variant="glass-violet" rim hoverable>
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
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card variant="glass" rim className="dashboard-card">
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
            Rank Atual
          </p>
          <p
            className={`mt-2 font-mono text-3xl font-bold ${rankTextColors[rank]}`}
          >
            {rank}-Rank
          </p>
        </Card>
        <StatCard label="XP Total" value={user?.totalXp ?? 0} />
        <StatCard label="Progresso" value={pct} suffix="%" />
      </div>

      {/* Attributes */}
      {attrs && (
        <Card variant="glass" rim className="dashboard-card">
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
      )}

      {/* Streak + Quests */}
      {gamData && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card variant="glass-violet" rim className="dashboard-card">
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
              Combo de Caçadas
            </h2>
            <StreakCounter streak={gamData.streak} />
          </Card>

          <Card variant="glass" rim className="dashboard-card md:col-span-2">
            <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
              Quests
            </h2>
            <div className="flex flex-col gap-0.5">
              {[...gamData.quests.main, ...gamData.quests.daily, ...gamData.quests.side].map(
                (q) => (
                  <QuestItem key={q.quest_id} quest={q} />
                ),
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Badges */}
      {gamData && (
        <Card variant="glass" rim className="dashboard-card">
          <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
            Badges ({gamData.earnedBadges.length} / {gamData.allBadges.length})
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {gamData.allBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                earned={gamData.earnedBadges.find((eb) => eb.slug === badge.slug)}
              />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
