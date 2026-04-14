# Frontend Visual Revision — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the SoloDev.AI frontend from a functional-but-basic dark interface to an immersive Dark Gaming/RPG atmospheric experience with refined typography, proper iconography, and moderate animations.

**Architecture:** Purely visual revision — no routing, state management, or API changes. We upgrade the design system (colors, fonts, depth), replace emoji icons with Lucide React, add animation hooks (useCountUp, useStaggered), and restyle every component and page. All changes are CSS/JSX-level.

**Tech Stack:** React 19, Tailwind CSS 4, Lucide React (new), Inter + JetBrains Mono fonts (new via Google Fonts CDN)

---

## File Map

**New files:**
- `frontend/src/hooks/useCountUp.ts` — count-up animation hook for numbers
- `frontend/src/hooks/useStaggered.ts` — staggered fade-in animation hook
- `frontend/src/components/ui/Skeleton.tsx` — shimmer skeleton loader component

**Modified files:**
- `frontend/index.html` — add Google Fonts link tags
- `frontend/src/index.css` — add global styles (font-family, background, animations, atmospheric gradients)
- `frontend/src/components/ui/Button.tsx` — gradient + glow styling
- `frontend/src/components/ui/Card.tsx` — semi-transparent surface + hover scale
- `frontend/src/components/ui/Input.tsx` — atmospheric input styling + uppercase labels
- `frontend/src/components/ui/Header.tsx` — Inter tight tracking typography
- `frontend/src/components/ui/Modal.tsx` — backdrop blur + scale entrance
- `frontend/src/components/layout/PageWrapper.tsx` — atmospheric background
- `frontend/src/components/layout/Sidebar.tsx` — Lucide icons, rank glow avatar, active indicator
- `frontend/src/components/layout/ProtectedRoute.tsx` — skeleton loader
- `frontend/src/components/features/AttributeBar.tsx` — gradient fill, glow, animated bar
- `frontend/src/components/features/CourseCard.tsx` — rank glow borders, Lucide lock icon
- `frontend/src/components/features/LessonPlayer.tsx` — atmospheric empty state with Lucide icon
- `frontend/src/pages/Login.tsx` — centered glassmorphism card with atmospheric background
- `frontend/src/pages/Register.tsx` — same atmospheric treatment as Login
- `frontend/src/pages/Dashboard.tsx` — count-up stats, staggered cards, JetBrains Mono numbers
- `frontend/src/pages/Courses.tsx` — staggered cards, skeleton loaders
- `frontend/src/pages/CourseDetail.tsx` — Lucide status icons, atmospheric module cards
- `frontend/src/pages/Lesson.tsx` — completion animation, Lucide icons

---

## Task 1: Install Dependencies & Load Fonts

**Files:**
- Modify: `frontend/package.json`
- Modify: `frontend/index.html`

- [ ] **Step 1: Install lucide-react**

```bash
cd d:/Playground/SoloDev.AI/frontend && npm install lucide-react
```

- [ ] **Step 2: Add Google Fonts to index.html**

In `frontend/index.html`, add font preconnect and stylesheet links inside `<head>`, before the `<title>` tag:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
```

- [ ] **Step 3: Verify build compiles**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/package.json frontend/package-lock.json frontend/index.html && git commit -m "feat: add lucide-react and Google Fonts (Inter + JetBrains Mono)"
```

---

## Task 2: Global Styles & CSS Foundation

**Files:**
- Modify: `frontend/src/index.css`

- [ ] **Step 1: Replace index.css with full design system styles**

Replace the entire content of `frontend/src/index.css` with:

```css
@import "tailwindcss";

/* ── Design System: SoloDev.AI Dark Gaming/RPG ── */

/* Base */
html {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  background-color: #07070d;
  color: #f1f5f9;
}

.font-mono {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}

/* Atmospheric page background */
.bg-atmosphere {
  position: relative;
}
.bg-atmosphere::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.07) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 80%, rgba(59,130,246,0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* Skeleton shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 25%,
    rgba(255,255,255,0.06) 50%,
    rgba(255,255,255,0.03) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 8px;
}

/* Fade-in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out both;
}

/* Glow pulse for completion */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 8px rgba(52,211,153,0.3); }
  50% { box-shadow: 0 0 20px rgba(52,211,153,0.6); }
}
.animate-glow-pulse {
  animation: glowPulse 1s ease-in-out 2;
}

/* Scale entrance for modals */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-scale-in {
  animation: scaleIn 0.2s ease-out both;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.08);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.15);
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/index.css && git commit -m "feat: add global design system styles — fonts, atmosphere, animations, scrollbar"
```

---

## Task 3: Animation Hooks

**Files:**
- Create: `frontend/src/hooks/useCountUp.ts`
- Create: `frontend/src/hooks/useStaggered.ts`

- [ ] **Step 1: Create useCountUp hook**

Create `frontend/src/hooks/useCountUp.ts`:

```typescript
import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 700): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }

    let start: number | null = null;
    let raf: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}
```

- [ ] **Step 2: Create useStaggered hook**

Create `frontend/src/hooks/useStaggered.ts`:

```typescript
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
```

- [ ] **Step 3: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/hooks/useCountUp.ts frontend/src/hooks/useStaggered.ts && git commit -m "feat: add useCountUp and useStaggered animation hooks"
```

---

## Task 4: Skeleton Loader Component

**Files:**
- Create: `frontend/src/components/ui/Skeleton.tsx`

- [ ] **Step 1: Create Skeleton component**

Create `frontend/src/components/ui/Skeleton.tsx`:

```typescript
interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />;
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/ui/Skeleton.tsx && git commit -m "feat: add Skeleton shimmer loader component"
```

---

## Task 5: Button Component Upgrade

**Files:**
- Modify: `frontend/src/components/ui/Button.tsx`

- [ ] **Step 1: Update Button with gradient and glow styles**

Replace the entire content of `frontend/src/components/ui/Button.tsx` with:

```typescript
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-violet-700 to-violet-500 text-white shadow-[0_0_12px_rgba(124,58,237,0.25)] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] focus-visible:ring-violet-500",
  secondary:
    "bg-white/5 text-zinc-100 border border-white/10 hover:bg-white/8 hover:border-white/15 focus-visible:ring-zinc-500",
  ghost:
    "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200 focus-visible:ring-zinc-500",
  danger:
    "bg-gradient-to-r from-red-700 to-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] focus-visible:ring-red-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070d] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/ui/Button.tsx && git commit -m "feat: upgrade Button with gradient, glow, and atmospheric styling"
```

---

## Task 6: Card Component Upgrade

**Files:**
- Modify: `frontend/src/components/ui/Card.tsx`

- [ ] **Step 1: Update Card with semi-transparent surface and hover**

Replace the entire content of `frontend/src/components/ui/Card.tsx` with:

```typescript
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted";
  hoverable?: boolean;
}

export default function Card({
  variant = "default",
  hoverable = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const base = "rounded-2xl border p-6 transition-all duration-250 ease-out";
  const variants = {
    default: "border-white/[0.06] bg-white/[0.03]",
    highlighted:
      "border-violet-500/20 bg-violet-500/[0.04] shadow-[0_0_15px_rgba(139,92,246,0.08)]",
  };
  const hover = hoverable
    ? "hover:scale-[1.02] hover:border-white/[0.12] cursor-pointer"
    : "";

  return (
    <div className={`${base} ${variants[variant]} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/ui/Card.tsx && git commit -m "feat: upgrade Card with semi-transparent surface and hover scale"
```

---

## Task 7: Input Component Upgrade

**Files:**
- Modify: `frontend/src/components/ui/Input.tsx`

- [ ] **Step 1: Update Input with atmospheric styling**

Replace the entire content of `frontend/src/components/ui/Input.tsx` with:

```typescript
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-400"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] disabled:opacity-50 ${error ? "border-red-500/50" : ""} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/ui/Input.tsx && git commit -m "feat: upgrade Input with atmospheric borders and uppercase labels"
```

---

## Task 8: Header & Modal Upgrades

**Files:**
- Modify: `frontend/src/components/ui/Header.tsx`
- Modify: `frontend/src/components/ui/Modal.tsx`

- [ ] **Step 1: Update Header with tight tracking typography**

Replace the entire content of `frontend/src/components/ui/Header.tsx` with:

```typescript
interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
```

- [ ] **Step 2: Update Modal with backdrop blur and scale entrance**

Replace the entire content of `frontend/src/components/ui/Modal.tsx` with:

```typescript
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="w-full max-w-lg rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-0 text-zinc-100 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-scale-in"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200 cursor-pointer"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>
      <div className="px-6 py-4">{children}</div>
    </dialog>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/ui/Header.tsx frontend/src/components/ui/Modal.tsx && git commit -m "feat: upgrade Header typography and Modal with blur/scale animation"
```

---

## Task 9: Sidebar Upgrade

**Files:**
- Modify: `frontend/src/components/layout/Sidebar.tsx`

- [ ] **Step 1: Replace Sidebar with Lucide icons, rank glow, active indicator**

Replace the entire content of `frontend/src/components/layout/Sidebar.tsx` with:

```typescript
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
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/layout/Sidebar.tsx && git commit -m "feat: upgrade Sidebar with Lucide icons, rank glow avatar, and active indicator"
```

---

## Task 10: PageWrapper & ProtectedRoute Upgrades

**Files:**
- Modify: `frontend/src/components/layout/PageWrapper.tsx`
- Modify: `frontend/src/components/layout/ProtectedRoute.tsx`

- [ ] **Step 1: Update PageWrapper with atmospheric background**

Replace the entire content of `frontend/src/components/layout/PageWrapper.tsx` with:

```typescript
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="bg-atmosphere flex min-h-screen bg-[#07070d] text-zinc-100">
      <Sidebar />
      <main className="relative z-[1] flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Update ProtectedRoute with skeleton loading**

Replace the entire content of `frontend/src/components/layout/ProtectedRoute.tsx` with:

```typescript
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Skeleton from "../ui/Skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07070d]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700 to-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

- [ ] **Step 3: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/layout/PageWrapper.tsx frontend/src/components/layout/ProtectedRoute.tsx && git commit -m "feat: add atmospheric background to PageWrapper and skeleton loading to ProtectedRoute"
```

---

## Task 11: AttributeBar Upgrade

**Files:**
- Modify: `frontend/src/components/features/AttributeBar.tsx`

- [ ] **Step 1: Update AttributeBar with gradient glow and animated fill**

Replace the entire content of `frontend/src/components/features/AttributeBar.tsx` with:

```typescript
import { useEffect, useState } from "react";

interface AttributeBarProps {
  label: string;
  value: number;
  maxValue?: number;
  colorFrom?: string;
  colorTo?: string;
  glowColor?: string;
}

const defaultColors = {
  from: "from-violet-700",
  to: "to-violet-400",
  glow: "rgba(139,92,246,0.3)",
};

export default function AttributeBar({
  label,
  value,
  maxValue = 100,
  colorFrom = defaultColors.from,
  colorTo = defaultColors.to,
  glowColor = defaultColors.glow,
}: AttributeBarProps) {
  const pct = Math.min((value / maxValue) * 100, 100);
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(pct), 100);
    return () => clearTimeout(timer);
  }, [pct]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
          {label}
        </span>
        <span className="font-mono text-xs font-bold text-zinc-300">
          {value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorFrom} ${colorTo} transition-all duration-800 ease-out`}
          style={{
            width: `${animatedWidth}%`,
            boxShadow: animatedWidth > 0 ? `0 0 8px ${glowColor}` : "none",
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/features/AttributeBar.tsx && git commit -m "feat: upgrade AttributeBar with gradient glow and animated fill"
```

---

## Task 12: CourseCard & LessonPlayer Upgrades

**Files:**
- Modify: `frontend/src/components/features/CourseCard.tsx`
- Modify: `frontend/src/components/features/LessonPlayer.tsx`

- [ ] **Step 1: Update CourseCard with rank glow and Lucide icons**

Replace the entire content of `frontend/src/components/features/CourseCard.tsx` with:

```typescript
import { Link } from "react-router-dom";
import { Lock, ChevronRight } from "lucide-react";
import Card from "../ui/Card";
import type { Course } from "../../services/courseService";

const rankColors: Record<string, string> = {
  E: "text-zinc-400",
  D: "text-green-400",
  C: "text-blue-400",
  B: "text-violet-400",
  A: "text-orange-400",
  S: "text-red-400",
};

const rankBorderGlow: Record<string, string> = {
  E: "hover:border-zinc-400/20 hover:shadow-[0_0_12px_rgba(161,161,170,0.1)]",
  D: "hover:border-green-400/20 hover:shadow-[0_0_12px_rgba(74,222,128,0.1)]",
  C: "hover:border-blue-400/20 hover:shadow-[0_0_12px_rgba(96,165,250,0.1)]",
  B: "hover:border-violet-400/20 hover:shadow-[0_0_12px_rgba(167,139,250,0.1)]",
  A: "hover:border-orange-400/20 hover:shadow-[0_0_12px_rgba(251,146,60,0.1)]",
  S: "hover:border-red-400/20 hover:shadow-[0_0_12px_rgba(248,113,113,0.1)]",
};

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  if (course.locked) {
    return (
      <Card className="opacity-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock size={16} className="text-zinc-600" />
            <div>
              <span
                className={`font-mono text-[10px] font-bold uppercase tracking-wider ${rankColors[course.rank_required] || "text-zinc-400"}`}
              >
                {course.rank_required}-Rank
              </span>
              <h3 className="mt-0.5 text-base font-semibold text-zinc-400">
                {course.title}
              </h3>
            </div>
          </div>
          <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
            Requer Awakening
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Link to={`/courses/${course.id}`}>
      <Card
        variant="highlighted"
        hoverable
        className={`${rankBorderGlow[course.rank_required] || ""}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span
              className={`font-mono text-[10px] font-bold uppercase tracking-wider ${rankColors[course.rank_required] || "text-zinc-400"}`}
            >
              {course.rank_required}-Rank
            </span>
            <h3 className="mt-0.5 text-base font-semibold text-slate-100">
              {course.title}
            </h3>
          </div>
          <ChevronRight size={18} className="text-violet-400" />
        </div>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: Update LessonPlayer with atmospheric empty state**

Replace the entire content of `frontend/src/components/features/LessonPlayer.tsx` with:

```typescript
import { Video } from "lucide-react";

interface LessonPlayerProps {
  videoUrl: string | null;
  title: string;
}

export default function LessonPlayer({ videoUrl, title }: LessonPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
            <Video size={24} className="text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400">
              Conteúdo em breve
            </p>
            <p className="mt-1 text-xs text-zinc-600">{title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-white/[0.06]">
      <iframe
        src={videoUrl}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/components/features/CourseCard.tsx frontend/src/components/features/LessonPlayer.tsx && git commit -m "feat: upgrade CourseCard with rank glow and LessonPlayer with atmospheric empty state"
```

---

## Task 13: Login Page Redesign

**Files:**
- Modify: `frontend/src/pages/Login.tsx`

- [ ] **Step 1: Redesign Login with centered glassmorphism card**

Replace the entire content of `frontend/src/pages/Login.tsx` with:

```typescript
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07070d] px-4">
      {/* Atmospheric background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(59,130,246,0.05)_0%,transparent_40%)]" />
      </div>

      {/* Card */}
      <div className="animate-fade-in-up relative w-full max-w-md rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700 to-violet-500 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-violet-400">SoloDev</span>
            <span className="text-slate-100">.AI</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Entre para continuar sua jornada
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="hunter@solodev.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="mt-2 w-full" loading={loading}>
            Iniciar Jornada
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Novo Hunter?{" "}
          <Link
            to="/register"
            className="text-violet-400 transition-colors hover:text-violet-300"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/pages/Login.tsx && git commit -m "feat: redesign Login with glassmorphism card and atmospheric background"
```

---

## Task 14: Register Page Redesign

**Files:**
- Modify: `frontend/src/pages/Register.tsx`

- [ ] **Step 1: Redesign Register with same atmospheric style as Login**

Replace the entire content of `frontend/src/pages/Register.tsx` with:

```typescript
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07070d] px-4">
      {/* Atmospheric background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(59,130,246,0.05)_0%,transparent_40%)]" />
      </div>

      {/* Card */}
      <div className="animate-fade-in-up relative w-full max-w-md rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700 to-violet-500 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-violet-400">SoloDev</span>
            <span className="text-slate-100">.AI</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Crie sua conta e comece sua jornada como Hunter
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome de Hunter"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="hunter@solodev.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <Button type="submit" className="mt-2 w-full" loading={loading}>
            Criar conta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Já é Hunter?{" "}
          <Link
            to="/login"
            className="text-violet-400 transition-colors hover:text-violet-300"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/pages/Register.tsx && git commit -m "feat: redesign Register with atmospheric glassmorphism style"
```

---

## Task 15: Dashboard Page Redesign

**Files:**
- Modify: `frontend/src/pages/Dashboard.tsx`

- [ ] **Step 1: Redesign Dashboard with count-up stats, staggered cards, JetBrains Mono numbers**

Replace the entire content of `frontend/src/pages/Dashboard.tsx` with:

```typescript
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import AttributeBar from "../components/features/AttributeBar";
import { useAuthStore } from "../store/useAuthStore";
import { getDashboard, type DashboardData } from "../services/progressService";
import { useCountUp } from "../hooks/useCountUp";
import { useStaggered } from "../hooks/useStaggered";

const rankTextColors: Record<string, string> = {
  E: "text-zinc-400",
  D: "text-green-400",
  C: "text-blue-400",
  B: "text-violet-400",
  A: "text-orange-400",
  S: "text-red-400",
};

function StatCard({
  label,
  value,
  suffix = "",
  colorClass = "text-slate-100",
  visible,
}: {
  label: string;
  value: number;
  suffix?: string;
  colorClass?: string;
  visible: boolean;
}) {
  const animated = useCountUp(visible ? value : 0);
  return (
    <Card
      className={`transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
        {label}
      </p>
      <p className={`mt-2 font-mono text-3xl font-bold ${colorClass}`}>
        {animated}
        {suffix}
      </p>
    </Card>
  );
}

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const staggered = useStaggered(loading ? 0 : 5);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  const attrs = data?.attributes;
  const next = data?.nextLesson;
  const summary = data?.summary;
  const pct =
    summary && summary.total_lessons > 0
      ? Math.round((summary.completed_lessons / summary.total_lessons) * 100)
      : 0;
  const rank = user?.currentRank ?? "E";

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Status Window"
        subtitle={`Bem-vindo, ${user?.name ?? "Hunter"}. Continue sua jornada.`}
        action={
          next ? (
            <Link to={`/courses/${next.course_id}/lessons/${next.lesson_id}`}>
              <Button>Continuar onde parou</Button>
            </Link>
          ) : undefined
        }
      />

      {/* Next lesson card */}
      {next && (
        <div
          className={`transition-all duration-300 ease-out ${staggered[0] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <Link to={`/courses/${next.course_id}/lessons/${next.lesson_id}`}>
            <Card variant="highlighted" hoverable>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-violet-400">
                    Próxima missão
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-slate-100">
                    {next.lesson_title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {next.course_title} · {next.module_title}
                  </p>
                </div>
                <ChevronRight size={20} className="text-violet-400" />
              </div>
            </Card>
          </Link>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Rank Atual"
          value={0}
          suffix=""
          colorClass={rankTextColors[rank]}
          visible={staggered[1] ?? false}
        />
        <StatCard
          label="XP Total"
          value={user?.totalXp ?? 0}
          colorClass="text-slate-100"
          visible={staggered[2] ?? false}
        />
        <StatCard
          label="Progresso"
          value={pct}
          suffix="%"
          colorClass="text-slate-100"
          visible={staggered[3] ?? false}
        />
      </div>

      {/* Override rank card to show text, not number */}
      {staggered[1] && (
        <style>{`.grid > :first-child .font-mono.text-3xl { display: none; }`}</style>
      )}

      {/* Attributes */}
      {attrs && (
        <div
          className={`transition-all duration-300 ease-out ${staggered[4] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <Card>
            <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
              Atributos do Hunter
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AttributeBar
                label="Prompt Mastery"
                value={attrs.prompt_mastery}
                colorFrom="from-emerald-600"
                colorTo="to-emerald-400"
                glowColor="rgba(52,211,153,0.3)"
              />
              <AttributeBar
                label="Frontend Power"
                value={attrs.frontend_power}
                colorFrom="from-blue-600"
                colorTo="to-blue-400"
                glowColor="rgba(96,165,250,0.3)"
              />
              <AttributeBar
                label="Backend Strength"
                value={attrs.backend_strength}
                colorFrom="from-orange-600"
                colorTo="to-orange-400"
                glowColor="rgba(251,146,60,0.3)"
              />
              <AttributeBar
                label="DB Knowledge"
                value={attrs.db_knowledge}
                colorFrom="from-cyan-600"
                colorTo="to-cyan-400"
                glowColor="rgba(34,211,238,0.3)"
              />
              <AttributeBar
                label="Security Level"
                value={attrs.security_level}
                colorFrom="from-red-600"
                colorTo="to-red-400"
                glowColor="rgba(248,113,113,0.3)"
              />
              <AttributeBar
                label="Deploy Speed"
                value={attrs.deploy_speed}
                colorFrom="from-violet-600"
                colorTo="to-violet-400"
                glowColor="rgba(167,139,250,0.3)"
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/pages/Dashboard.tsx && git commit -m "feat: redesign Dashboard with count-up stats, staggered animations, and skeleton loading"
```

---

## Task 16: Dashboard Rank Card Fix

The StatCard for "Rank Atual" in Task 15 shows a count-up number (0), but should show the rank text like "S-Rank". The injected `<style>` tag is a hack. Let's fix it properly.

**Files:**
- Modify: `frontend/src/pages/Dashboard.tsx`

- [ ] **Step 1: Replace the stats grid and remove the style hack**

In `frontend/src/pages/Dashboard.tsx`, replace the section from `{/* Stats cards */}` through the `<style>` tag with:

```typescript
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Rank card — text, not number */}
        <Card
          className={`transition-all duration-300 ease-out ${staggered[1] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
            Rank Atual
          </p>
          <p className={`mt-2 font-mono text-3xl font-bold ${rankTextColors[rank]}`}>
            {rank}-Rank
          </p>
        </Card>

        <StatCard
          label="XP Total"
          value={user?.totalXp ?? 0}
          colorClass="text-slate-100"
          visible={staggered[2] ?? false}
        />
        <StatCard
          label="Progresso"
          value={pct}
          suffix="%"
          colorClass="text-slate-100"
          visible={staggered[3] ?? false}
        />
      </div>
```

Also remove this block entirely:

```typescript
      {/* Override rank card to show text, not number */}
      {staggered[1] && (
        <style>{`.grid > :first-child .font-mono.text-3xl { display: none; }`}</style>
      )}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/pages/Dashboard.tsx && git commit -m "fix: show rank text instead of count-up number in Dashboard rank card"
```

---

## Task 17: Courses Page Upgrade

**Files:**
- Modify: `frontend/src/pages/Courses.tsx`

- [ ] **Step 1: Upgrade Courses with staggered cards and skeleton loading**

Replace the entire content of `frontend/src/pages/Courses.tsx` with:

```typescript
import { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Skeleton from "../components/ui/Skeleton";
import CourseCard from "../components/features/CourseCard";
import { listCourses, type Course } from "../services/courseService";
import { useStaggered } from "../hooks/useStaggered";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const staggered = useStaggered(loading ? 0 : courses.length);

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Sistema de Caçadas"
        subtitle="Escolha sua missão e suba de rank."
      />

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((course, i) => (
            <div
              key={course.id}
              className={`transition-all duration-300 ease-out ${staggered[i] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/pages/Courses.tsx && git commit -m "feat: upgrade Courses page with staggered animations and skeleton loading"
```

---

## Task 18: CourseDetail Page Upgrade

**Files:**
- Modify: `frontend/src/pages/CourseDetail.tsx`

- [ ] **Step 1: Upgrade CourseDetail with Lucide icons and atmospheric modules**

Replace the entire content of `frontend/src/pages/CourseDetail.tsx` with:

```typescript
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import {
  getCourse,
  type CourseDetail as CourseDetailType,
} from "../services/courseService";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  return `${m} min`;
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getCourse(Number(id))
      .then(setCourse)
      .catch((err) =>
        setError(
          err.response?.data?.error?.message || "Erro ao carregar curso",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <Skeleton className="h-7 w-64" />
          <Skeleton className="mt-2 h-4 w-40" />
        </div>
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-400">{error || "Curso não encontrado"}</p>
        <Link to="/courses">
          <Button variant="secondary">Voltar às missões</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Header
        title={course.title}
        subtitle={`${course.rank_required}-Rank · ${course.modules.length} módulos`}
        action={
          <Link to="/courses">
            <Button variant="ghost">← Voltar</Button>
          </Link>
        }
      />

      <div className="flex flex-col gap-6">
        {course.modules.map((mod) => (
          <div
            key={mod.id}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
          >
            <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
              Módulo {mod.order_index} — {mod.title}
            </h3>
            <ul className="flex flex-col gap-0.5">
              {mod.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-all duration-150 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle
                        size={16}
                        className="text-violet-400"
                      />
                      <span>
                        {lesson.order_index}. {lesson.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-600">
                      {formatDuration(lesson.duration_s)}
                      {lesson.xp_reward > 0 && ` · +${lesson.xp_reward} XP`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/pages/CourseDetail.tsx && git commit -m "feat: upgrade CourseDetail with Lucide icons and atmospheric module cards"
```

---

## Task 19: Lesson Page Upgrade

**Files:**
- Modify: `frontend/src/pages/Lesson.tsx`

- [ ] **Step 1: Upgrade Lesson with completion animation and Lucide icons**

Replace the entire content of `frontend/src/pages/Lesson.tsx` with:

```typescript
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import LessonPlayer from "../components/features/LessonPlayer";
import { getLesson, type Lesson as LessonType } from "../services/courseService";
import { completeLesson } from "../services/progressService";

export default function Lesson() {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    if (!id || !lessonId) return;
    getLesson(Number(id), Number(lessonId))
      .then(setLesson)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, lessonId]);

  async function handleComplete() {
    if (!lessonId || completed) return;
    setCompleting(true);
    try {
      const result = await completeLesson(Number(lessonId));
      setCompleted(true);
      setXpEarned(result.xpEarned);
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-7 w-72" />
          <Skeleton className="mt-2 h-4 w-40" />
        </div>
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-10 w-48" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-400">Aula não encontrada</p>
        <Link to={`/courses/${id}`}>
          <Button variant="secondary">Voltar ao curso</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Header
        title={lesson.title}
        subtitle={`+${lesson.xp_reward} XP ao completar`}
        action={
          <Link to={`/courses/${id}`}>
            <Button variant="ghost">← Voltar ao curso</Button>
          </Link>
        }
      />

      <LessonPlayer videoUrl={lesson.video_url} title={lesson.title} />

      <div className="flex items-center justify-between">
        {completed && xpEarned > 0 && (
          <div className="flex items-center gap-2 animate-fade-in-up">
            <CheckCircle
              size={18}
              className="text-emerald-400 animate-glow-pulse"
            />
            <p className="font-mono text-sm font-bold text-emerald-400">
              +{xpEarned} XP conquistados!
            </p>
          </div>
        )}
        {completed && xpEarned === 0 && (
          <p className="text-sm text-zinc-600">
            Missão já completada anteriormente
          </p>
        )}
        {!completed && <div />}

        <Button
          onClick={handleComplete}
          loading={completing}
          disabled={completed}
          variant={completed ? "secondary" : "primary"}
        >
          {completed ? "Missão concluída" : "Marcar como concluída"}
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd d:/Playground/SoloDev.AI && git add frontend/src/pages/Lesson.tsx && git commit -m "feat: upgrade Lesson page with completion animation and skeleton loading"
```

---

## Task 20: Final Build Verification

- [ ] **Step 1: Run full TypeScript check**

```bash
cd d:/Playground/SoloDev.AI/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2: Run production build**

```bash
cd d:/Playground/SoloDev.AI/frontend && npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
cd d:/Playground/SoloDev.AI/frontend && npm run dev
```

Open http://localhost:5173 and verify:
- Login page: atmospheric background with glassmorphism card, Zap logo icon
- Register page: same atmospheric style
- Sidebar: Lucide icons, rank glow on avatar, active indicator bar
- Dashboard: staggered card animations, count-up numbers, gradient attribute bars
- Courses: staggered course cards with rank glow on hover
- CourseDetail: Lucide status icons, atmospheric module cards
- Lesson: video player or atmospheric empty state, completion animation

- [ ] **Step 4: Commit any remaining fixes if needed**
