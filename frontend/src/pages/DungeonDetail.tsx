import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Circle, Trophy } from "lucide-react";
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import {
  getDungeon,
  startDungeon,
  toggleCheckpoint,
  completeDungeon,
  type DungeonDetail as DungeonDetailType,
} from "../services/dungeonService";

export default function DungeonDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [dungeon, setDungeon] = useState<DungeonDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    if (!slug) return;
    getDungeon(slug)
      .then((d) => {
        setDungeon(d);
        if (d.status === "completed") setCompleted(true);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleStart() {
    if (!slug || !dungeon) return;
    await startDungeon(slug);
    setDungeon({ ...dungeon, status: "in_progress" });
  }

  async function handleToggleCheckpoint(checkpointId: number, checked: boolean) {
    if (!slug || !dungeon) return;
    await toggleCheckpoint(slug, checkpointId, checked);
    setDungeon({
      ...dungeon,
      checkpoints: dungeon.checkpoints.map((cp) =>
        cp.id === checkpointId ? { ...cp, checked } : cp,
      ),
    });
  }

  async function handleComplete() {
    if (!slug || !dungeon) return;
    setCompleting(true);
    try {
      const result = await completeDungeon(slug);
      setCompleted(true);
      setXpEarned(result.xpReward);
      setDungeon({ ...dungeon, status: "completed" });
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!dungeon) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-400">Dungeon nao encontrada</p>
        <Link to="/projects"><Button variant="secondary">Voltar</Button></Link>
      </div>
    );
  }

  const allChecked = dungeon.checkpoints.every((cp) => cp.checked);
  const checkedCount = dungeon.checkpoints.filter((cp) => cp.checked).length;

  return (
    <div className="flex flex-col gap-6">
      <Header
        title={dungeon.title}
        subtitle={`${dungeon.rank_required}-Rank · +${dungeon.xp_reward} XP`}
        action={
          <Link to="/projects"><Button variant="ghost">← Voltar</Button></Link>
        }
      />

      {dungeon.description && (
        <Card>
          <p className="text-sm text-zinc-400">{dungeon.description}</p>
        </Card>
      )}

      {/* Status / Start */}
      {dungeon.status === "not_started" && (
        <Button onClick={handleStart} className="w-fit">
          Iniciar Dungeon
        </Button>
      )}

      {/* Checkpoints (Boss Final) */}
      {dungeon.status !== "not_started" && (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
              Boss Final — Checklist de Validacao
            </h2>
            <span className="font-mono text-xs text-zinc-600">
              {checkedCount}/{dungeon.checkpoints.length}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {dungeon.checkpoints.map((cp) => (
              <button
                key={cp.id}
                onClick={() => handleToggleCheckpoint(cp.id, !cp.checked)}
                disabled={completed}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 hover:bg-white/3 disabled:pointer-events-none cursor-pointer"
              >
                {cp.checked ? (
                  <CheckCircle size={18} className="text-emerald-400" />
                ) : (
                  <Circle size={18} className="text-zinc-700" />
                )}
                <span className={`text-sm ${cp.checked ? "text-zinc-500 line-through" : "text-zinc-300"}`}>
                  {cp.description}
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Complete button */}
      {dungeon.status === "in_progress" && !completed && (
        <div className="flex items-center gap-4">
          <Button
            onClick={handleComplete}
            loading={completing}
            disabled={!allChecked}
          >
            Finalizar Dungeon
          </Button>
          {!allChecked && (
            <p className="text-xs text-zinc-600">Complete todos os checkpoints</p>
          )}
        </div>
      )}

      {/* Completion celebration */}
      {completed && xpEarned > 0 && (
        <Card variant="highlighted" className="animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600/30 to-emerald-400/30 animate-glow-pulse">
              <Trophy size={24} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-emerald-400">Dungeon Conquistada!</p>
              <p className="font-mono text-sm text-zinc-400">+{xpEarned} XP</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
