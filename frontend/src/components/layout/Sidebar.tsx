import { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Zap, BookOpen, Crosshair, Castle, LogOut, Shield, X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useAuth } from "../../hooks/useAuth";
import { useIris } from "../../hooks/useIris";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const navItems = [
  { to: "/", label: "Status Window", icon: Zap },
  { to: "/courses", label: "Missões", icon: BookOpen },
  { to: "/prompt-lab", label: "Sala de Treinamento", icon: Crosshair },
  { to: "/projects", label: "Dungeons", icon: Castle },
];

const rankGlowColors: Record<string, string> = {
  E: "border-zinc-400 shadow-[0_0_10px_rgba(161,161,170,0.25)]",
  D: "border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.25)]",
  C: "border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.25)]",
  B: "border-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.25)]",
  A: "border-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.25)]",
  S: "border-red-400 shadow-[0_0_10px_rgba(248,113,113,0.25)]",
};

const rankTextColors: Record<string, string> = {
  E: "text-zinc-400",
  D: "text-green-400",
  C: "text-blue-400",
  B: "text-violet-400",
  A: "text-orange-400",
  S: "text-red-400",
};

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const { navigateWithIris, isAnimating } = useIris();
  const rank = user?.currentRank ?? "E";
  const isAdmin = user?.role === "admin";

  const handleLogout = useCallback(async () => {
    if (isAnimating) return;
    await logout();
    navigateWithIris("/login");
  }, [logout, navigateWithIris, isAnimating]);

  // Close on escape in mobile
  useEffect(() => {
    if (!open || !onClose) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      {/* Mobile backdrop */}
      {open && onClose && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`glass-surface-strong glass-rim-right fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col transition-transform duration-300 ease-out lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button (mobile) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200 lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        )}

        {/* Navigation */}
        <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-6">
          <ul className="flex flex-col gap-1">
            {[...navItems, ...(isAdmin ? [{ to: "/admin", label: "Admin", icon: Shield }] : [])].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "border-l-[3px] border-violet-500 bg-violet-500/10 pl-[9px] text-slate-100"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile */}
        <div className="relative z-10 border-t border-white/6 px-4 py-4">
          <div className="flex items-center gap-3">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className={`h-9 w-9 rounded-full border-2 object-cover ${rankGlowColors[rank] ?? ""}`}
              />
            ) : (
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white/5 font-mono text-sm font-bold ${rankGlowColors[rank] ?? ""} ${rankTextColors[rank] ?? "text-zinc-400"}`}
              >
                {user?.name?.charAt(0).toUpperCase() ?? "H"}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-200">
                {user?.name ?? "Hunter"}
              </p>
              <p
                className={`font-mono text-xs font-medium ${rankTextColors[rank] ?? "text-zinc-500"}`}
              >
                {rank}-Rank · {user?.totalXp ?? 0} XP
              </p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isAnimating}
              className="cursor-pointer rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-white/5 hover:text-zinc-400 disabled:opacity-50"
              aria-label="Sair"
            >
              <LogOut size={16} />
            </button>
          </div>

          {/* Mini XP bar */}
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-linear-to-r from-violet-700 to-violet-400 transition-all duration-800 ease-out"
              style={{
                width: `${Math.min(((user?.totalXp ?? 0) % 1000) / 10, 100)}%`,
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
