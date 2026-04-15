import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { heroReveal } from "../../lib/animations";

type Planet = "violet" | "blue" | "none";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: { label: string; onClick?: () => void; href?: string };
  planet?: Planet;
  children?: ReactNode;
}

const planetColor: Record<Exclude<Planet, "none">, string> = {
  violet: "drop-shadow-[0_0_60px_rgba(139,92,246,0.55)]",
  blue: "drop-shadow-[0_0_60px_rgba(59,130,246,0.55)]",
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  cta,
  planet = "violet",
  children,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      heroReveal(sectionRef.current);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function handleCta() {
    if (!cta) return;
    if (cta.onClick) cta.onClick();
    else if (cta.href) navigate(cta.href);
  }

  return (
    <section
      ref={sectionRef}
      className="glass-surface glass-rim-top relative mb-8 min-h-[280px] overflow-hidden rounded-3xl p-8 opacity-0 lg:min-h-[340px] lg:p-12"
    >
      {/* Planet (background right) */}
      {planet !== "none" && (
        <div className="pointer-events-none absolute -right-20 top-1/2 hidden h-[400px] w-[400px] -translate-y-1/2 opacity-80 md:block lg:-right-10">
          <img
            src={`/planet-${planet}.svg`}
            alt=""
            className={`h-full w-full ${planetColor[planet]}`}
          />
        </div>
      )}

      {/* Ambient bottom glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-violet-600/5 via-purple-500/2 to-transparent" />

      {/* Left text column */}
      <div className="relative z-10 max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[2px] text-violet-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-base text-zinc-400 lg:text-lg">
            {subtitle}
          </p>
        )}
        {cta && (
          <Button
            variant="glass-primary"
            size="lg"
            onClick={handleCta}
            className="mt-6"
          >
            {cta.label}
          </Button>
        )}
        {children}
      </div>
    </section>
  );
}
