import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  plan: "free" | "pro";
  currentRank: string;
  totalXp: number;
  avatarUrl: string | null;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: () => get().user !== null,
}));
