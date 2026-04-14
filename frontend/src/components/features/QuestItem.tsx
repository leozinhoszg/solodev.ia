import { CheckCircle, Circle } from "lucide-react";
import type { Quest } from "../../services/gamificationService";

interface QuestItemProps {
  quest: Quest;
}

const typeLabel: Record<string, string> = {
  main: "Principal",
  daily: "Diária",
  side: "Secundária",
};

const typeColor: Record<string, string> = {
  main: "text-violet-400",
  daily: "text-emerald-400",
  side: "text-blue-400",
};

export default function QuestItem({ quest }: QuestItemProps) {
  return (
    <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150 ${
      quest.completed ? "opacity-60" : "hover:bg-white/3"
    }`}>
      {quest.completed ? (
        <CheckCircle size={16} className="text-emerald-400" />
      ) : (
        <Circle size={16} className="text-zinc-700" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${quest.completed ? "text-zinc-500 line-through" : "text-zinc-300"}`}>
          {quest.title}
        </p>
        {quest.description && (
          <p className="text-xs text-zinc-600">{quest.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${typeColor[quest.type] ?? "text-zinc-500"}`}>
          {typeLabel[quest.type] ?? quest.type}
        </span>
        <span className="font-mono text-xs font-bold text-zinc-500">+{quest.xp_reward} XP</span>
      </div>
    </div>
  );
}
