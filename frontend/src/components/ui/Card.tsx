import type { HTMLAttributes } from "react";

type CardVariant = "default" | "highlighted" | "glass" | "glass-violet";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  rim?: boolean;
  shine?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: "rounded-2xl border border-white/6 bg-white/3 p-6",
  highlighted:
    "rounded-2xl border border-violet-500/20 bg-violet-500/4 p-6 shadow-[0_0_15px_rgba(139,92,246,0.08)]",
  glass: "glass-surface rounded-2xl",
  "glass-violet": "glass-surface glass-violet-glow rounded-2xl",
};

export default function Card({
  variant = "default",
  hoverable = false,
  rim = false,
  shine = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const isGlass = variant === "glass" || variant === "glass-violet";
  const base = "transition-all duration-250 ease-out";
  const hover = hoverable
    ? "hover:scale-[1.02] hover:border-white/12 cursor-pointer"
    : "";
  const rimClass = rim ? "glass-rim-top" : "";
  const padding = isGlass ? "" : "";

  return (
    <div
      className={`${base} ${variantClasses[variant]} ${rimClass} ${hover} ${className}`}
      {...props}
    >
      {shine && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 -left-1/4 z-20 h-[200%] w-[55%] rotate-25 bg-linear-to-b from-white/10 via-white/3 to-transparent"
        />
      )}
      {isGlass ? (
        <div className={`relative z-10 ${padding || "p-6"}`}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
