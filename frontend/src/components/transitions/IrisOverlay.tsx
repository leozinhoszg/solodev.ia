import { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useIrisTransition } from "../../store/useIrisTransition";

/**
 * Full-screen iris transition overlay.
 *
 * Mounts globally (in App.tsx), persists across navigation.
 * Subscribes to the `useIrisTransition` store and plays a
 * close → navigate → open sequence when `trigger()` is called.
 *
 * Rendering strategy:
 *   - A full-screen black layer with a `mask-image: radial-gradient()`
 *     cut-out controlled by CSS custom property `--iris-r`.
 *   - GSAP tweens a plain JS ref (no React re-render per frame) and
 *     writes the new radius into the CSS variable via onUpdate.
 *   - GPU-accelerated, no WebGL, no layout thrash.
 */
export default function IrisOverlay() {
  const phase = useIrisTransition((s) => s.phase);
  const targetPath = useIrisTransition((s) => s.targetPath);
  const setPhase = useIrisTransition((s) => s.setPhase);

  const navigate = useNavigate();

  const overlayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Mutable animation state — avoids React re-renders per frame
  const anim = useRef({ r: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const maxRadius = () =>
    Math.hypot(window.innerWidth, window.innerHeight) / 2 + 60;

  const applyRadius = (r: number) => {
    if (overlayRef.current) {
      overlayRef.current.style.setProperty("--iris-r", `${r}px`);
    }
    if (ringRef.current) {
      const size = Math.max(r * 2, 0);
      ringRef.current.style.width = `${size}px`;
      ringRef.current.style.height = `${size}px`;
      // Ring fades out as it grows very large (end of opening / start of closing)
      const max = maxRadius();
      const progress = Math.min(r / max, 1);
      const ringOpacity =
        progress < 0.15
          ? progress / 0.15
          : progress > 0.85
            ? (1 - progress) / 0.15
            : 1;
      ringRef.current.style.opacity = String(ringOpacity * 0.9);
    }
  };

  /* Ensure initial CSS variable is set before first paint of each phase */
  useLayoutEffect(() => {
    if (phase === "closing") {
      anim.current.r = maxRadius();
    } else if (phase === "opening") {
      anim.current.r = 0;
    } else {
      anim.current.r = maxRadius(); // idle: overlay clipped away
    }
    applyRadius(anim.current.r);
  }, [phase]);

  /* Drive animations on phase change */
  useEffect(() => {
    tweenRef.current?.kill();

    // Respect prefers-reduced-motion — instant phase transitions
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (phase === "closing") {
      anim.current.r = maxRadius();
      applyRadius(anim.current.r);

      if (prefersReduced) {
        anim.current.r = 0;
        applyRadius(0);
        if (targetPath) navigate(targetPath);
        setPhase("opening");
        return;
      }

      tweenRef.current = gsap.to(anim.current, {
        r: 0,
        duration: 0.75,
        ease: "power2.inOut",
        onUpdate: () => applyRadius(anim.current.r),
        onComplete: () => {
          applyRadius(0); // ensure fully closed
          if (targetPath) navigate(targetPath);
          // Let React commit the new route before we start opening.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setPhase("opening"));
          });
        },
      });
    } else if (phase === "opening") {
      anim.current.r = 0;
      applyRadius(0);

      if (prefersReduced) {
        anim.current.r = maxRadius();
        applyRadius(anim.current.r);
        setPhase("idle");
        return;
      }

      tweenRef.current = gsap.to(anim.current, {
        r: maxRadius(),
        duration: 0.9,
        ease: "power3.out",
        onUpdate: () => applyRadius(anim.current.r),
        onComplete: () => {
          setPhase("idle");
        },
      });
    }

    return () => {
      tweenRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const active = phase !== "idle";
  // Render always so the DOM is warm, but keep it invisible when idle via pointer-events + opacity
  return (
    <>
      {/* Black iris overlay with a circular "hole" controlled by --iris-r */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000",
          zIndex: 9998,
          pointerEvents: active ? "auto" : "none",
          opacity: active ? 1 : 0,
          // Mask: transparent center (hole), black outside
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 0, transparent var(--iris-r, 0px), black calc(var(--iris-r, 0px) + 2px))",
          maskImage:
            "radial-gradient(circle at center, transparent 0, transparent var(--iris-r, 0px), black calc(var(--iris-r, 0px) + 2px))",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          transition: active ? "none" : "opacity 0.2s ease-out",
        }}
      />

      {/* Subtle violet ring at the iris edge — purely decorative */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "2px solid rgba(192,132,252,0.9)",
          boxShadow:
            "0 0 40px rgba(168,85,247,0.7), 0 0 80px rgba(139,92,246,0.35), inset 0 0 20px rgba(168,85,247,0.4)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          willChange: "width, height, opacity",
        }}
      />
    </>
  );
}
