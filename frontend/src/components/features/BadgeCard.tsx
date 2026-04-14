import { Award } from "lucide-react";
import type { Badge, EarnedBadge } from "../../services/gamificationService";

const rankGlow: Record<string, string> = {
  E: "border-zinc-500/20 shadow-[0_0_8px_rgba(161,161,170,0.15)]",
  D: "border-green-500/20 shadow-[0_0_8px_rgba(74,222,128,0.15)]",
  C: "border-blue-500/20 shadow-[0_0_8px_rgba(96,165,250,0.15)]",
  B: "border-violet-500/20 shadow-[0_0_8px_rgba(167,139,250,0.15)]",
  A: "border-orange-500/20 shadow-[0_0_8px_rgba(251,146,60,0.15)]",
  S: "border-red-500/20 shadow-[0_0_8px_rgba(248,113,113,0.15)]",
};

const rankText: Record<string, string> = {
  E: "text-zinc-400",
  D: "text-green-400",
  C: "text-blue-400",
  B: "text-violet-400",
  A: "text-orange-400",
  S: "text-red-400",
};

interface BadgeCardProps {
  badge: Badge;
  earned?: EarnedBadge;
}

export default function BadgeCard({ badge, earned }: BadgeCardProps) {
  const isEarned = !!earned;

  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 ${
        isEarned
          ? `${rankGlow[badge.rank_tier] ?? ""} bg-white/[0.03]`
          : "border-white/[0.04] bg-white/[0.01] opacity-40"
      }`}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
        isEarned ? "bg-gradient-to-br from-violet-700/30 to-violet-500/30" : "bg-white/[0.04]"
      }`}>
        <Award size={20} className={isEarned ? (rankText[badge.rank_tier] ?? "text-violet-400") : "text-zinc-700"} />
      </div>
      <p className={`text-xs font-semibold ${isEarned ? "text-zinc-200" : "text-zinc-600"}`}>
        {badge.name}
      </p>
      <p className="text-[10px] text-zinc-600">{badge.description}</p>
      {isEarned && earned && (
        <p className={`font-mono text-[10px] font-medium ${rankText[badge.rank_tier] ?? "text-zinc-500"}`}>
          {badge.rank_tier}-Rank
        </p>
      )}
    </div>
  );
}
