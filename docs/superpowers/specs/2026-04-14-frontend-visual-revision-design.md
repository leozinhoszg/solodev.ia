# SoloDev.AI — Frontend Visual Revision Design

## Overview

Revision of the SoloDev.AI frontend to achieve a rich, immersive Dark Gaming/RPG visual identity inspired by Solo Leveling. The current frontend is functional but visually basic — this revision adds atmospheric depth, refined typography, proper iconography, and moderate animations while preserving the existing architecture and logic.

## Design Decisions

| Aspect | Decision |
|--------|----------|
| Visual Identity | Dark Gaming/RPG — Atmospheric with Depth |
| Icons | Lucide React |
| Typography | Inter (UI) + JetBrains Mono (stats/code) |
| Login/Register | Centered glassmorphism card with atmospheric background |
| Animations | Moderate — staggered cards, count-up, animated XP bars, scale hover |
| Navigation | Enhanced fixed sidebar with Lucide icons and rank glow |

## 1. Design System

### 1.1 Color System

Keep the existing violet/zinc palette but add atmospheric depth layers:

- **Base background**: `#07070d` (deeper than current zinc-950)
- **Surface**: `rgba(255,255,255,0.03)` with `border: 1px solid rgba(255,255,255,0.06)`
- **Surface hover**: `rgba(255,255,255,0.05)` with `border: 1px solid rgba(255,255,255,0.10)`
- **Page atmospherics**: Radial gradients — `radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.08) 0%, transparent 60%)`
- **Interactive glow**: `box-shadow: 0 0 Npx rgba(color, 0.25)` on key elements
- **Stat text-shadow**: `0 0 6px rgba(color, 0.25)` on numbers

**Attribute colors** (unchanged):
- Emerald-500: Prompt Mastery / Frontend
- Blue-500: DB Knowledge / Database
- Orange-500: Backend Strength
- Cyan-500: Security
- Red-500: Danger / S-Rank
- Violet-500: Primary brand / XP

**Rank colors** (unchanged):
- E-Rank: zinc-400 | D-Rank: green-400 | C-Rank: blue-400
- B-Rank: violet-400 | A-Rank: orange-400 | S-Rank: red-400

### 1.2 Typography

**Fonts** (loaded via Google Fonts):
- **Inter** — all UI text: body, labels, headings, navigation
- **JetBrains Mono** — XP values, rank labels, attribute numbers, counters, code snippets

**Hierarchy**:
- Display (page titles): Inter 24px, weight 700, letter-spacing -0.8px
- Heading (section titles): Inter 18px, weight 600, letter-spacing -0.4px
- Body: Inter 14px, weight 400, line-height 1.6
- Label: Inter 10-11px, weight 500-600, uppercase, letter-spacing 1.5px
- Stats/Numbers: JetBrains Mono 16-20px, weight 700
- Small stats: JetBrains Mono 11-12px, weight 500

### 1.3 Borders and Depth

- **Semi-transparent borders**: `rgba(255,255,255,0.06)` default, `rgba(255,255,255,0.10)` on hover
- **Colored borders for attribute cards**: `rgba(color, 0.15)` with matching `background: rgba(color, 0.06)`
- **Backdrop-filter**: `blur(8px)` on featured cards (login, modals)
- **Border radius scale**: 8px (buttons, inputs), 10px (stat cards), 12px (avatar), 16px (main cards, modals)
- **Elevation**: Via background opacity steps (0.03 → 0.05 → 0.08), not box-shadow depth

### 1.4 Spacing

- Follow existing Tailwind spacing scale (gap-1 through gap-8, p-4 through p-8)
- Section gaps: 24-32px between major sections
- Card internal padding: 16-20px
- Sidebar width: w-64 (unchanged)

## 2. Component Upgrades

### 2.1 Button

- **Primary**: `background: linear-gradient(135deg, #6d28d9, #7c3aed)`, `box-shadow: 0 0 12px rgba(124,58,237,0.25)`
- **Hover**: Glow intensifies to `0 0 20px rgba(124,58,237,0.4)`
- **Secondary**: `background: rgba(255,255,255,0.05)`, `border: rgba(255,255,255,0.10)`
- **Ghost/Danger**: Keep existing logic, update to match new surface system
- **All**: Add `transition: all 200ms ease-out`

### 2.2 Card

- **Default**: `background: rgba(255,255,255,0.03)`, `border: 1px solid rgba(255,255,255,0.06)`, `border-radius: 16px`
- **Hover**: `transform: scale(1.02)`, `border-color: rgba(255,255,255,0.12)`, `transition: all 250ms ease-out`
- **Highlighted**: Add subtle glow matching the highlight color

### 2.3 Input

- **Default**: `background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 8px`
- **Focus**: `border-color: rgba(139,92,246,0.5)`, `box-shadow: 0 0 0 3px rgba(139,92,246,0.1)`
- **Label**: Uppercase, letter-spacing 1px, color `#94a3b8`

### 2.4 AttributeBar

- **Bar background**: `rgba(color, 0.1)`
- **Bar fill**: `linear-gradient(90deg, colorDark, colorLight)` with `box-shadow: 0 0 8px rgba(color, 0.3)`
- **Animation**: Fill width transitions from 0 to target on mount (CSS transition 800ms ease-out)

### 2.5 Modal

- **Backdrop**: `backdrop-filter: blur(8px)`, `background: rgba(0,0,0,0.6)`
- **Modal card**: Same as Card component with `border-radius: 16px`
- **Enter animation**: Scale from 0.95 + fade in, 200ms

### 2.6 Header

- **Title**: Inter 24px, weight 700, letter-spacing -0.8px, color `#f1f5f9`
- **Subtitle**: Inter 14px, color `#64748b`

## 3. Page Designs

### 3.1 Login / Register

- Full-screen dark background (`#07070d`)
- Radial gradient atmospherics: violet at top-center, blue at bottom
- Centered card (max-width ~400px) with glassmorphism: `backdrop-filter: blur(8px)`, semi-transparent bg, subtle border
- Logo with glow effect at top of card
- "SoloDev.AI" title + "Entre para continuar sua jornada" subtitle
- Form fields with new Input styling
- Primary button: "Iniciar Jornada" with gradient and glow
- Footer link: "Novo Hunter? Criar conta" with violet accent

### 3.2 Dashboard (Status Window)

- Page atmospheric background with radial gradients
- **User Profile Section**: Avatar with rank-colored border glow, Hunter name, rank badge with JetBrains Mono
- **XP Bar**: Full-width, animated fill on mount, JetBrains Mono for values
- **Attribute Grid**: 2x3 grid of attribute stat cards, each with:
  - Colored background tint `rgba(color, 0.06)` and border `rgba(color, 0.15)`
  - Large number in JetBrains Mono with text-shadow glow
  - Uppercase label
  - Count-up animation on mount
- **Next Lesson Card**: Highlighted card with CTA button
- **Staggered fade-in**: All cards appear with 100ms delay between each

### 3.3 Courses

- Grid of CourseCards (responsive 1-3 columns)
- Each card:
  - Rank color indicator (top border or side accent)
  - Course title and description
  - Progress bar if enrolled
  - Lock icon (Lucide `Lock`) with rank requirement for locked courses
  - Hover: `scale(1.02)` + border glow in rank color
- Staggered appearance animation

### 3.4 Course Detail

- Course header with title, description, rank badge
- Module list with accordion-style expand/collapse
- Lesson items with:
  - Lucide icons for status (CheckCircle completed, PlayCircle available, Lock locked)
  - Progress indicator
- Sidebar-style layout: course info left, lesson list right (on desktop)

### 3.5 Lesson

- Improved video player area with dark container and rounded corners
- Lesson title and description below
- "Concluir Lição" button with gradient, on completion: brief success animation (checkmark scale-in + glow pulse)
- Navigation to next/previous lesson

## 4. Sidebar Upgrade

### 4.1 Structure (unchanged)
- Fixed left sidebar, w-64
- User profile section at top
- Navigation links in middle
- Logout at bottom

### 4.2 Visual Upgrades
- **Replace emojis with Lucide icons**: LayoutDashboard, BookOpen, FlaskConical, FolderGit2, Target, Castle
- **Avatar**: Circular with `border: 2px solid rankColor`, `box-shadow: 0 0 12px rgba(rankColor, 0.3)`
- **Rank badge**: JetBrains Mono, uppercase, rank color
- **Mini XP bar**: Thin animated bar below profile section
- **Nav items**:
  - Default: `color: #64748b`, Lucide icon + text
  - Hover: `background: rgba(255,255,255,0.05)`, `color: #e2e8f0`
  - Active: Left violet border indicator (3px), `color: #f1f5f9`, `background: rgba(139,92,246,0.08)`
- **Sidebar background**: `#09090b` with subtle top border or right border `rgba(255,255,255,0.06)`

## 5. Animations

### 5.1 Page Transitions
- Fade-in on route change: opacity 0→1, 200ms ease-out
- Slight translateY (8px → 0) for content entrance

### 5.2 Staggered Card Appearance
- Cards in grids appear sequentially with 80-100ms delay
- Each card: opacity 0→1, translateY 12px→0, 300ms ease-out

### 5.3 Count-Up Numbers
- XP, attribute values count from 0 to target value
- Duration: 600-800ms, ease-out curve
- Trigger: on component mount (intersection observer optional)

### 5.4 Progress Bars
- Fill width animates from 0% to target on mount
- Duration: 800ms, ease-out
- Glow intensifies as bar fills

### 5.5 Hover Interactions
- Cards: `transform: scale(1.02)`, 200ms ease-out
- Buttons: Glow intensity increases, 150ms
- Nav items: Background fade-in, 150ms

### 5.6 Skeleton Loaders
- Replace current spinner with skeleton shimmer placeholders
- Shimmer: Linear gradient animation sliding left-to-right
- Match the shape of content being loaded (cards, bars, text blocks)

## 6. New Dependencies

- `lucide-react` — icon library
- `@fontsource/inter` and `@fontsource/jetbrains-mono` — self-hosted fonts (or Google Fonts CDN link in index.html)

## 7. Scope Boundaries

**In scope:**
- All visual/CSS changes to existing components
- New animation utilities/hooks (useCountUp, useStaggered)
- Font and icon library integration
- Skeleton loader component
- Updated color/spacing tokens

**Out of scope:**
- Backend changes
- New features or pages
- Routing changes
- Authentication logic changes
- State management changes
