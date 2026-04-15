# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SoloDev.AI is a freemium SaaS platform for learning AI-assisted development, built with a dark RPG-themed gamification system. Monorepo with independent `/backend` (Express + MySQL) and `/frontend` (React + Vite) apps.

## Commands

### Backend (`cd backend`)
```bash
npm run dev       # tsx watch src/app.ts (port 3001)
npm run build     # tsc compilation
npm start         # node dist/app.js
npm run migrate   # knex migrate:latest
npm run seed      # knex seed:run
```

### Frontend (`cd frontend`)
```bash
npm run dev       # Vite dev server (port 5173, proxies /api → :3001)
npm run build     # tsc && vite build
npm run preview   # vite preview
```

No test framework, linter, or CI/CD is currently configured.

## Architecture

### Backend — Layered Architecture
`Routes → Controllers → Services → Repositories`

- **Routes** (`src/routes/`): Define Express endpoints under `/api`
- **Controllers** (`src/controllers/`): Extract request data, call services, send responses
- **Services** (`src/services/`): Business logic orchestration
- **Repositories** (`src/repositories/`): Data access via Knex query builder (MySQL)
- **Middleware** (`src/middleware/`): `auth.ts` (Bearer JWT), `errorHandler.ts` (global), `rateLimiter.ts`
- **Utils** (`src/utils/`): `AppError` (custom error class with statusCode + errorCode), `jwt.ts`, `hash.ts` (Argon2), `validate.ts` (Zod schemas)
- **Config** (`src/config/`): `env.ts` (Zod-validated env vars), `database.ts` (MySQL pool)

Error pattern: `throw new AppError(statusCode, "message", "ERROR_CODE")` → caught by global error handler → `{success: false, error: {message, code}}`

### Frontend — React 19 SPA
- **State**: Zustand stores (`useAuthStore`, `useIrisTransition`)
- **API layer**: Axios instance (`src/services/api.ts`) with Bearer token and 401 → `/login` redirect interceptor
- **Routing**: React Router v7 with `ProtectedRoute` wrapper
- **Styling**: Tailwind CSS 4 with dark theme (bg `#07070d`), Inter + JetBrains Mono fonts
- **Animations**: Framer Motion, GSAP (custom build from `../GSAP`), Three.js (login background with low-end device detection)
- **Layout**: `AuthLayout` (login/register), `PageWrapper` + `Sidebar` (authenticated pages)

### Key Modules
- **Auth**: Argon2 hashing, JWT access (15m) + refresh (7d) token rotation, rate-limited (10 req/60s)
- **Prompt Lab**: Submits prompts to Claude API (`claude-sonnet-4-20250514`) for evaluation (score 0-100), awards up to 30 XP
- **Gamification**: XP → Ranks (E→D→C→B→A→S), attributes, badges, quests (main/daily/side), streaks with 7-day milestones
- **Dungeons**: Project-based learning with checkpoints and boss validation, rank-gated
- **Payments**: Stripe checkout for "Awakening Pro" (R$47/month BRL), webhook lifecycle handling (subscription created/renewed/cancelled)
- **Password Reset**: Token via Resend email → verify → new password + new JWT

### Database
MySQL 8 with 22 Knex migrations. Key tables: `users` (with plan/rank/xp), `refresh_tokens`, `courses`/`modules`/`lessons`, `user_progress`, `user_attributes`, `xp_transactions` (audit log), `badges`, `quests`, `user_streaks`, `dungeons`/`dungeon_checkpoints`, `subscriptions`/`payment_events`.

### Environment Variables
Backend requires: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET` (min 32 chars), `ANTHROPIC_API_KEY`. Optional: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `BUNNY_*` (CDN), `SMTP_*` (Resend email), `ALLOWED_ORIGINS`. See `.env.example` for full list.

Frontend Vite config proxies `/api` to backend at `http://localhost:3001`.
