import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";
import Skeleton from "../components/ui/Skeleton";
import PageHero from "../components/layout/PageHero";
import ModuleCard from "../components/features/ModuleCard";
import { listDungeons, type Dungeon } from "../services/dungeonService";
import { staggerCards } from "../lib/animations";

const rankTone: Record<string, "blue" | "violet" | "orange" | "red" | "zinc"> = {
  C: "blue",
  B: "violet",
  A: "orange",
  S: "red",
};

function statusBadge(status: Dungeon["status"]):
  | { text: string; tone: "green" | "violet" }
  | undefined {
  if (status === "completed") return { text: "Conquistado", tone: "green" };
  if (status === "in_progress") return { text: "Em progresso", tone: "violet" };
  return undefined;
}

export default function Dungeons() {
  const [dungeons, setDungeons] = useState<Dungeon[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listDungeons()
      .then(setDungeons)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      staggerCards(".dungeon-card", { delay: 0.2, stagger: 0.08 });
    }, gridRef);
    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-40 rounded-3xl" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHero
        eyebrow="Dungeons"
        title="Projetos que valem XP de verdade."
        subtitle="Dungeons são desafios guiados por checkpoints. Derrote o boss e prove seu rank."
        planet="violet"
      />

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {dungeons.map((d) => {
          const badge = statusBadge(d.status) ?? {
            text: `${d.rank_required}-Rank`,
            tone: rankTone[d.rank_required] ?? "zinc",
          };
          const imageFallback =
            d.rank_required === "S" || d.rank_required === "A" ? "violet" : "blue";
          return (
            <div key={d.id} className="dungeon-card">
              <ModuleCard
                title={d.title}
                description={d.description ?? undefined}
                imageFallback={imageFallback}
                badge={badge}
                locked={d.locked}
                lockedReason={
                  d.locked ? `Requer rank ${d.rank_required}` : undefined
                }
                href={d.locked ? undefined : `/projects/${d.slug}`}
                meta={
                  !d.locked && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-zinc-500">
                        +{d.xp_reward} XP
                      </span>
                      {d.status === "completed" && (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle size={12} /> Feito
                        </span>
                      )}
                    </div>
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
