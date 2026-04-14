import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Status Window", icon: "⚡" },
  { to: "/courses", label: "Missões", icon: "📋" },
  { to: "/prompt-lab", label: "Sala de Treinamento", icon: "🎯" },
  { to: "/projects", label: "Dungeons", icon: "🏰" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-6 py-5">
        <span className="text-xl font-bold text-violet-400">SoloDev</span>
        <span className="text-xl font-bold text-zinc-100">.AI</span>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-violet-600/15 text-violet-400"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-zinc-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-zinc-800" />
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-zinc-200">Hunter</p>
            <p className="text-xs text-zinc-500">E-Rank</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
