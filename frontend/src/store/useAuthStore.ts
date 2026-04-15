import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  plan: "free" | "pro";
  role: "user" | "admin";
  currentRank: string;
  totalXp: number;
  avatarUrl: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setInitialized: () => set({ initialized: true }),
  isAuthenticated: () => get().user !== null,
}));
