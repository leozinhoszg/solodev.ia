import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Lock, ChevronRight } from "lucide-react";

type Tone = "violet" | "green" | "red" | "zinc" | "blue" | "orange";

const badgeToneClasses: Record<Tone, string> = {
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  green: "bg-green-500/20 text-green-300 border-green-500/30",
  red: "bg-red-500/20 text-red-300 border-red-500/30",
  zinc: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

interface ModuleCardProps {
  title: string;
  description?: string;
  image?: string;
  imageFallback?: "violet" | "blue";
  badge?: { text: string; tone?: Tone };
  progress?: number;
  locked?: boolean;
  lockedReason?: string;
  onClick?: () => void;
  href?: string;
  meta?: ReactNode;
}

export default function ModuleCard({
  title,
  description,
  image,
  imageFallback = "violet",
  badge,
  progress,
  locked = false,
  lockedReason,
  onClick,
  href,
  meta,
}: ModuleCardProps) {
  const card = (
    <article
      className={`glass-surface glass-rim-top group relative flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-300 ${
        locked
          ? "opacity-60"
          : "cursor-pointer hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)]"
      }`}
      onClick={locked ? undefined : onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className={`h-full w-full ${
              imageFallback === "blue"
                ? "bg-linear-to-br from-blue-900/60 via-[#0b1230] to-[#07070d]"
                : "bg-linear-to-br from-violet-900/60 via-[#1e1033] to-[#07070d]"
            }`}
          >
            <img
              src={`/planet-${imageFallback}.svg`}
              alt=""
              aria-hidden
              className="h-full w-full scale-150 object-contain opacity-70"
            />
          </div>
        )}
        {/* Overlay gradient for text legibility */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${badgeToneClasses[badge.tone ?? "violet"]}`}
          >
            {badge.text}
          </span>
        )}

        {locked && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-black/60 px-4 py-3 text-center">
              <Lock size={18} className="text-zinc-300" />
              {lockedReason && (
                <span className="text-xs font-medium text-zinc-300">
                  {lockedReason}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-tight text-slate-100">
            {title}
          </h3>
          {!locked && (
            <ChevronRight
              size={18}
              className="mt-0.5 shrink-0 text-violet-400 transition-transform group-hover:translate-x-1"
            />
          )}
        </div>
        {description && (
          <p className="line-clamp-2 text-sm text-zinc-400">{description}</p>
        )}
        {meta && <div className="mt-auto pt-2">{meta}</div>}
      </div>

      {/* Progress bar */}
      {typeof progress === "number" && (
        <div className="h-1 bg-white/5">
          <div
            className="h-full bg-linear-to-r from-violet-700 to-violet-400 transition-all duration-500"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      )}
    </article>
  );

  if (locked) return card;
  if (href) return <Link to={href}>{card}</Link>;
  return card;
}
