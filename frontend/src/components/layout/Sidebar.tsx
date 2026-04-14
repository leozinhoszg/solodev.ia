import { NavLink } from "react-router-dom";
import {
  Zap,
  BookOpen,
  Crosshair,
  Castle,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useAuth } from "../../hooks/useAuth";

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

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const rank = user?.currentRank ?? "E";

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-white/[0.06] bg-[#09090b]">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-700 to-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.3)]">
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">
          <span className="text-violet-400">SoloDev</span>
          <span className="text-slate-100">.AI</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "border-l-[3px] border-violet-500 bg-violet-500/[0.08] pl-[9px] text-slate-100"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
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
      <div className="border-t border-white/[0.06] px-4 py-4">
        <div className="flex items-center gap-3">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className={`h-9 w-9 rounded-full border-2 object-cover ${rankGlowColors[rank] ?? ""}`}
            />
          ) : (
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white/[0.05] font-mono text-sm font-bold ${rankGlowColors[rank] ?? ""} ${rankTextColors[rank] ?? "text-zinc-400"}`}
            >
              {user?.name?.charAt(0).toUpperCase() ?? "H"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-zinc-200">
              {user?.name ?? "Hunter"}
            </p>
            <p className={`font-mono text-xs font-medium ${rankTextColors[rank] ?? "text-zinc-500"}`}>
              {rank}-Rank · {user?.totalXp ?? 0} XP
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-white/[0.05] hover:text-zinc-400 cursor-pointer"
            aria-label="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Mini XP bar */}
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-700 to-violet-400 transition-all duration-800 ease-out"
            style={{ width: `${Math.min(((user?.totalXp ?? 0) % 1000) / 10, 100)}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
