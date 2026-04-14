interface AttributeBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export default function AttributeBar({
  label,
  value,
  maxValue = 100,
  color = "bg-violet-500",
}: AttributeBarProps) {
  const pct = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">{label}</span>
        <span className="text-xs font-bold text-zinc-300">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
