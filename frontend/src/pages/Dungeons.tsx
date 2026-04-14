import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Castle, Lock, ChevronRight, CheckCircle } from "lucide-react";
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import { listDungeons, type Dungeon } from "../services/dungeonService";

const rankColors: Record<string, string> = {
  C: "text-blue-400",
  B: "text-violet-400",
  A: "text-orange-400",
  S: "text-red-400",
};

const rankGlow: Record<string, string> = {
  C: "hover:border-blue-400/20 hover:shadow-[0_0_12px_rgba(96,165,250,0.1)]",
  B: "hover:border-violet-400/20 hover:shadow-[0_0_12px_rgba(167,139,250,0.1)]",
  A: "hover:border-orange-400/20 hover:shadow-[0_0_12px_rgba(251,146,60,0.1)]",
  S: "hover:border-red-400/20 hover:shadow-[0_0_12px_rgba(248,113,113,0.1)]",
};

function StatusBadge({ status }: { status: Dungeon["status"] }) {
  if (status === "completed") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
        <CheckCircle size={12} /> Conquistado
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold text-violet-400">
        Em progresso
      </span>
    );
  }
  return null;
}

export default function Dungeons() {
  const [dungeons, setDungeons] = useState<Dungeon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listDungeons()
      .then(setDungeons)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <Header title="Dungeons" subtitle="Projetos guiados para subir de rank." />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Header title="Dungeons" subtitle="Projetos guiados para subir de rank." />

      <div className="flex flex-col gap-4">
        {dungeons.map((d) =>
          d.locked ? (
            <Card key={d.id} className="opacity-50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                  <Lock size={20} className="text-zinc-700" />
                </div>
                <div className="flex-1">
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${rankColors[d.rank_required] ?? "text-zinc-400"}`}>
                    {d.rank_required}-Rank
                  </span>
                  <h3 className="text-base font-semibold text-zinc-500">{d.title}</h3>
                  <p className="mt-1 text-xs text-zinc-700">Requer rank {d.rank_required} para desbloquear</p>
                </div>
              </div>
            </Card>
          ) : (
            <Link key={d.id} to={`/projects/${d.slug}`}>
              <Card variant="highlighted" hoverable className={rankGlow[d.rank_required] ?? ""}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700/20 to-violet-500/20">
                    <Castle size={20} className={rankColors[d.rank_required] ?? "text-violet-400"} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${rankColors[d.rank_required] ?? "text-zinc-400"}`}>
                        {d.rank_required}-Rank
                      </span>
                      <StatusBadge status={d.status} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-100">{d.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{d.description}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-zinc-600">+{d.xp_reward} XP</p>
                  </div>
                  <ChevronRight size={18} className="text-violet-400" />
                </div>
              </Card>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
