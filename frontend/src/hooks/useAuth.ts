import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import * as authService from "../services/authService";

export function useAuth() {
  const { user, setUser, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const userData = await authService.getMe();
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        plan: userData.plan,
        currentRank: userData.current_rank,
        totalXp: userData.total_xp,
        avatarUrl: userData.avatar_url,
      });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    // Try to refresh token on mount to restore session
    authService
      .refreshToken()
      .then(() => loadUser())
      .catch(() => setLoading(false));
  }, [loadUser]);

  const login = async (email: string, password: string) => {
    await authService.login(email, password);
    await loadUser();
  };

  const register = async (name: string, email: string, password: string) => {
    await authService.register(name, email, password);
    await loadUser();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, loading, isAuthenticated: isAuthenticated(), login, register, logout };
}
