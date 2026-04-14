import { useRef, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import gsap from "gsap";
import LoginSceneBackground from "../transitions/LoginSceneBackground";
import bgLogin from "../../assets/bg-login.png";

export default function AuthLayout() {
  const bgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    function handleMove(e: MouseEvent) {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      bgRef.current.style.transform = `scale(1.08) translate(${x * -18}px, ${y * -12}px)`;
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useLayoutEffect(() => {
    if (!bgRef.current) return;
    gsap.fromTo(
      bgRef.current,
      { scale: 1.14, opacity: 0 },
      { scale: 1.08, opacity: 1, duration: 2.2, ease: "power2.out" },
    );
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">
      <img
        ref={bgRef}
        src={bgLogin}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
        style={{
          transform: "scale(1.08)",
          transition: "transform 0.6s ease-out",
          zIndex: 0,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/50"
        style={{ zIndex: 0 }}
      />
      <LoginSceneBackground />

      <div className="relative z-10 flex w-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
