import { useEffect, useState } from "react";

interface AttributeBarProps {
  label: string;
  value: number;
  maxValue?: number;
  colorFrom?: string;
  colorTo?: string;
  glowColor?: string;
}

const defaultColors = {
  from: "from-violet-700",
  to: "to-violet-400",
  glow: "rgba(139,92,246,0.3)",
};

export default function AttributeBar({
  label,
  value,
  maxValue = 100,
  colorFrom = defaultColors.from,
  colorTo = defaultColors.to,
  glowColor = defaultColors.glow,
}: AttributeBarProps) {
  const pct = Math.min((value / maxValue) * 100, 100);
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(pct), 100);
    return () => clearTimeout(timer);
  }, [pct]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
          {label}
        </span>
        <span className="font-mono text-xs font-bold text-zinc-300">
          {value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
        <div
          className={`h-full rounded-full bg-linear-to-r ${colorFrom} ${colorTo} transition-all duration-800 ease-out`}
          style={{
            width: `${animatedWidth}%`,
            boxShadow: animatedWidth > 0 ? `0 0 8px ${glowColor}` : "none",
          }}
        />
      </div>
    </div>
  );
}
