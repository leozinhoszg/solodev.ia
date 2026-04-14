import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted";
}

export default function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  const base = "rounded-xl border p-6";
  const variants = {
    default: "border-zinc-800 bg-zinc-900",
    highlighted: "border-violet-500/30 bg-zinc-900/80",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
