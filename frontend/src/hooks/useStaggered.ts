import { useEffect, useState } from "react";

export function useStaggered(itemCount: number, delayMs = 80): boolean[] {
  const [visible, setVisible] = useState<boolean[]>(() =>
    Array(itemCount).fill(false)
  );

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < itemCount; i++) {
      timers.push(
        setTimeout(() => {
          setVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * delayMs)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [itemCount, delayMs]);

  return visible;
}
