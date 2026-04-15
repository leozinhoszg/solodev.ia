import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import PageHero from "../components/layout/PageHero";
import PromptLabEditor from "../components/features/PromptLab";
import { getHistory, type PromptSubmission } from "../services/promptLabService";

function scoreColor(score: number | null): string {
  if (!score) return "text-zinc-500";
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  return "text-orange-400";
}

export default function PromptLabPage() {
  const [history, setHistory] = useState<PromptSubmission[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    getHistory().then(setHistory).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <PageHero
        eyebrow="Sala de Treinamento"
        title="Forje prompts poderosos."
        subtitle="Escreva, submeta e receba feedback imediato da IA. Cada treino vale XP."
        planet="blue"
      />

      <Card variant="glass" rim>
        <PromptLabEditor />
      </Card>

      {/* History */}
      {history.length > 0 && (
        <div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200"
          >
            {showHistory ? "Esconder" : "Mostrar"} histórico ({history.length} treinos)
          </button>

          {showHistory && (
            <div className="mt-4 flex flex-col gap-3">
              {history.map((sub) => (
                <Card
                  key={sub.id}
                  variant="glass"
                  rim
                  className="flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-zinc-300">
                      {sub.prompt_text}
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">
                      {new Date(sub.created_at).toLocaleDateString("pt-BR")}
                      {sub.xp_earned > 0 && ` · +${sub.xp_earned} XP`}
                    </p>
                  </div>
                  <span
                    className={`ml-4 text-lg font-bold ${scoreColor(sub.score)}`}
                  >
                    {sub.score ?? "—"}
                  </span>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
