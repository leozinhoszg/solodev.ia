import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted";
  hoverable?: boolean;
}

export default function Card({
  variant = "default",
  hoverable = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const base = "rounded-2xl border p-6 transition-all duration-250 ease-out";
  const variants = {
    default: "border-white/6 bg-white/3",
    highlighted:
      "border-violet-500/20 bg-violet-500/4 shadow-[0_0_15px_rgba(139,92,246,0.08)]",
  };
  const hover = hoverable
    ? "hover:scale-[1.02] hover:border-white/12 cursor-pointer"
    : "";

  return (
    <div className={`${base} ${variants[variant]} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
}
