import { create } from "zustand";

export type IrisPhase = "idle" | "closing" | "opening";

interface IrisState {
  phase: IrisPhase;
  targetPath: string | null;
  /** Start an iris transition: closes, navigates, opens */
  trigger: (opts: { targetPath: string }) => void;
  /** Internal — advance to the next phase */
  setPhase: (phase: IrisPhase) => void;
  /** Reset to idle (e.g., cancel mid-transition) */
  reset: () => void;
}

export const useIrisTransition = create<IrisState>((set, get) => ({
  phase: "idle",
  targetPath: null,
  trigger: ({ targetPath }) => {
    // Ignore if a transition is already in progress
    if (get().phase !== "idle") return;
    set({ phase: "closing", targetPath });
  },
  setPhase: (phase) => set({ phase }),
  reset: () => set({ phase: "idle", targetPath: null }),
}));
