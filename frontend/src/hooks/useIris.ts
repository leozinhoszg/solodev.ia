import { useCallback } from "react";
import { useIrisTransition } from "../store/useIrisTransition";

/**
 * Convenience hook for triggering iris transitions.
 *
 * Usage:
 *   const iris = useIris();
 *   iris.navigateWithIris("/dashboard");
 */
export function useIris() {
  const trigger = useIrisTransition((s) => s.trigger);
  const phase = useIrisTransition((s) => s.phase);

  const navigateWithIris = useCallback(
    (targetPath: string) => {
      trigger({ targetPath });
    },
    [trigger],
  );

  return {
    navigateWithIris,
    isAnimating: phase !== "idle",
    phase,
  };
}
