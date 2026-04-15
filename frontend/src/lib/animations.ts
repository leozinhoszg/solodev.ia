import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

if (!CustomEase.get("cardBounce")) {
  CustomEase.create(
    "cardBounce",
    "M0,0 C0.14,0 0.27,0.87 0.32,1.02 0.38,1.18 0.45,1 1,1",
  );
}

type Target = gsap.TweenTarget;

interface FadeInUpOptions {
  delay?: number;
  distance?: number;
  duration?: number;
  ease?: string;
}

export function fadeInUp(target: Target, opts: FadeInUpOptions = {}) {
  const { delay = 0, distance = 16, duration = 0.55, ease = "power3.out" } = opts;
  return gsap.fromTo(
    target,
    { opacity: 0, y: distance },
    { opacity: 1, y: 0, duration, delay, ease },
  );
}

interface StaggerCardsOptions {
  delay?: number;
  stagger?: number;
  distance?: number;
  duration?: number;
}

export function staggerCards(target: Target, opts: StaggerCardsOptions = {}) {
  const { delay = 0, stagger = 0.08, distance = 20, duration = 0.5 } = opts;
  return gsap.fromTo(
    target,
    { opacity: 0, y: distance, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: "power2.out",
    },
  );
}

interface HeroRevealOptions {
  bounce?: boolean;
  delay?: number;
  duration?: number;
}

export function heroReveal(target: Target, opts: HeroRevealOptions = {}) {
  const { bounce = true, delay = 0, duration = 0.9 } = opts;
  return gsap.fromTo(
    target,
    { opacity: 0, y: 30, scale: bounce ? 0.94 : 1 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: bounce ? "cardBounce" : "power3.out",
    },
  );
}

type GlowColor = "violet" | "emerald" | "red" | "amber";

const GLOW_RGB: Record<GlowColor, string> = {
  violet: "139,92,246",
  emerald: "52,211,153",
  red: "239,68,68",
  amber: "245,158,11",
};

interface GlowPulseOptions {
  color?: GlowColor;
  repeat?: number;
  duration?: number;
  delay?: number;
}

export function glowPulse(target: Target, opts: GlowPulseOptions = {}) {
  const { color = "violet", repeat = -1, duration = 2, delay = 0 } = opts;
  const rgb = GLOW_RGB[color];
  return gsap.fromTo(
    target,
    { boxShadow: `0 0 0px rgba(${rgb},0)` },
    {
      boxShadow: `0 0 24px rgba(${rgb},0.35), 0 0 48px rgba(${rgb},0.15)`,
      duration,
      delay,
      repeat,
      yoyo: true,
      ease: "sine.inOut",
    },
  );
}

interface ShineSweepOptions {
  duration?: number;
  delay?: number;
}

export function shineSweep(target: Target, opts: ShineSweepOptions = {}) {
  const { duration = 2.4, delay = 1.5 } = opts;
  return gsap.fromTo(
    target,
    { xPercent: -120 },
    {
      xPercent: 220,
      duration,
      delay,
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 4,
    },
  );
}

/**
 * Usage convention per page:
 *
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   useLayoutEffect(() => {
 *     const ctx = gsap.context(() => {
 *       heroReveal(heroRef.current);
 *       staggerCards(".dashboard-card", { delay: 0.3 });
 *     }, containerRef);
 *     return () => ctx.revert();
 *   }, []);
 */
