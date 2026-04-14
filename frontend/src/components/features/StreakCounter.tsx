import { Flame } from "lucide-react";
import type { Streak } from "../../services/gamificationService";

interface StreakCounterProps {
  streak: Streak;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  const isActive = streak.current_streak > 0;

  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
        isActive
          ? "bg-gradient-to-br from-orange-600/30 to-orange-400/30"
          : "bg-white/[0.04]"
      }`}>
        <Flame size={20} className={isActive ? "text-orange-400" : "text-zinc-700"} />
      </div>
      <div>
        <p className="font-mono text-2xl font-bold text-zinc-100">
          {streak.current_streak}
          <span className="ml-1 text-sm font-medium text-zinc-500">dias</span>
        </p>
        <p className="text-[10px] text-zinc-600">
          Recorde: {streak.longest_streak} dias
        </p>
      </div>
    </div>
  );
}
