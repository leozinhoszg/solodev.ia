import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, LogOut, User as UserIcon } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useAuth } from "../../hooks/useAuth";
import { useIris } from "../../hooks/useIris";
import SoloDevLogo from "../ui/SoloDevLogo";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const rankTextColors: Record<string, string> = {
  E: "text-zinc-400",
  D: "text-green-400",
  C: "text-blue-400",
  B: "text-violet-400",
  A: "text-orange-400",
  S: "text-red-400",
};

const routeLabels: Record<string, string> = {
  "/": "Status Window",
  "/courses": "Missões",
  "/prompt-lab": "Sala de Treinamento",
  "/projects": "Dungeons",
  "/admin": "Admin",
  "/awakening": "Despertar",
};

function getBreadcrumb(pathname: string): string {
  if (routeLabels[pathname]) return routeLabels[pathname];
  // Nested routes like /courses/123
  const [, first] = pathname.split("/");
  const root = `/${first}`;
  if (routeLabels[root]) return `${routeLabels[root]} › …`;
  return "";
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const { navigateWithIris, isAnimating } = useIris();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const rank = user?.currentRank ?? "E";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  async function handleLogout() {
    if (isAnimating) return;
    setMenuOpen(false);
    await logout();
    navigateWithIris("/login");
  }

  const breadcrumb = getBreadcrumb(location.pathname);

  return (
    <nav className="glass-surface-strong glass-rim-top sticky top-0 z-30 flex h-14 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>
        )}
        <Link to="/" className="flex items-center">
          <SoloDevLogo className="h-8 w-auto" />
        </Link>
        {breadcrumb && (
          <span className="ml-4 hidden text-sm text-zinc-500 md:block">
            {breadcrumb}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="field-glow rounded-full border border-white/8 bg-white/4 p-2 text-zinc-400 transition-colors hover:text-violet-300"
          aria-label="Notificações"
        >
          <Bell size={16} />
        </button>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3 transition-colors hover:bg-white/10"
            aria-label="Menu do usuário"
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20 font-mono text-xs font-bold text-violet-300">
                {user?.name?.charAt(0).toUpperCase() ?? "H"}
              </div>
            )}
            <span
              className={`hidden font-mono text-xs font-medium sm:block ${rankTextColors[rank]}`}
            >
              {rank}
            </span>
          </button>

          {menuOpen && (
            <div className="glass-surface-strong glass-rim-top absolute right-0 top-full mt-2 w-56 rounded-xl p-2 text-sm">
              <div className="relative z-10 border-b border-white/6 px-3 py-2">
                <p className="truncate font-medium text-zinc-100">
                  {user?.name ?? "Hunter"}
                </p>
                <p
                  className={`font-mono text-xs ${rankTextColors[rank]}`}
                >
                  {rank}-Rank · {user?.totalXp ?? 0} XP
                </p>
              </div>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="relative z-10 flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-300 transition-colors hover:bg-white/5 hover:text-zinc-100"
              >
                <UserIcon size={14} /> Perfil
              </Link>
              <button
                onClick={handleLogout}
                disabled={isAnimating}
                className="relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-zinc-300 transition-colors hover:bg-white/5 hover:text-zinc-100 disabled:opacity-50"
              >
                <LogOut size={14} /> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
