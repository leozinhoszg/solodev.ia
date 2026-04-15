import { useState, useRef, useLayoutEffect, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SoloDevLogo from "../components/ui/SoloDevLogo";
import { useAuth } from "../hooks/useAuth";
import { useIris } from "../hooks/useIris";

gsap.registerPlugin(TextPlugin, CustomEase);

type NavState = { slideFrom?: "center" } | null;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { navigateWithIris, isAnimating } = useIris();
  const navigate = useNavigate();
  const location = useLocation();
  const slideFrom = (location.state as NavState)?.slideFrom;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const logoGlowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading || isAnimating) return;
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigateWithIris("/");
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Erro ao criar conta");
      setLoading(false);
    }
  }

  function handleGoToLogin(e: React.MouseEvent) {
    e.preventDefault();
    if (!cardRef.current || isAnimating) return;
    gsap.to(cardRef.current, {
      scale: 0.88,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => navigate("/login", { state: { slideFrom: "center" } }),
    });
  }

  /* Entrance cinematic timeline */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      CustomEase.create(
        "cardBounce",
        "M0,0 C0.14,0 0.27,0.87 0.32,1.02 0.38,1.18 0.45,1 1,1",
      );

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const cardFrom = slideFrom
        ? { scale: 0.88, opacity: 0 }
        : { y: 40, opacity: 0 };

      tl.fromTo(
        cardRef.current,
        cardFrom,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: slideFrom ? 0.5 : 0.8,
          ease: slideFrom ? "power3.out" : "cardBounce",
        },
        slideFrom ? 0 : 0.5,
      );

      gsap
        .timeline({ repeat: -1, yoyo: true, delay: 1.3 })
        .fromTo(
          cardRef.current,
          { boxShadow: "0 0 0px rgba(139,92,246,0)" },
          {
            boxShadow:
              "0 0 24px rgba(139,92,246,0.18), 0 0 48px rgba(139,92,246,0.08)",
            duration: 2.5,
            ease: "sine.inOut",
          },
        );

      tl.fromTo(
        logoRef.current,
        {
          scale: 0.4,
          rotationY: -180,
          opacity: 0,
          filter: "blur(12px) brightness(2)",
        },
        {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          duration: 1.2,
          ease: "back.out(1.8)",
        },
        0.8,
      );

      tl.fromTo(
        logoGlowRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
        1.1,
      );

      gsap.to(logoRef.current, {
        y: -6,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      });

      gsap.to(logoGlowRef.current, {
        opacity: 0.55,
        scale: 1.12,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      });

      gsap.fromTo(
        "#logo-iris",
        { opacity: 0.55 },
        {
          opacity: 1,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.8,
        },
      );

      gsap.fromTo(
        ".logo-letter",
        { opacity: 0, y: 4 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1.4,
        },
      );

      gsap.fromTo(
        "#logo-grad",
        { attr: { x1: -80, x2: 120 } },
        {
          attr: { x1: 200, x2: 400 },
          duration: 4.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2.0,
        },
      );

      gsap.to("#logo-glow feGaussianBlur", {
        attr: { stdDeviation: 2.4 },
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2.2,
      });

      if (subtitleRef.current) {
        subtitleRef.current.textContent =
          "Crie sua conta e comece sua jornada";
      }
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        1.4,
      );

      const formChildren = formRef.current
        ? Array.from(formRef.current.children)
        : [];
      const staggerTargets = [...formChildren];
      if (linkRef.current) staggerTargets.push(linkRef.current);

      tl.fromTo(
        staggerTargets,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        2.0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, [slideFrom]);

  useLayoutEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" },
      );
    }
  }, [error]);

  const submitDisabled = loading || isAnimating;

  return (
    <div ref={containerRef} className="contents">
      <div
        ref={cardRef}
        className="relative w-full max-w-[420px] overflow-hidden rounded-2xl opacity-0 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.10),inset_0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-[2px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 50%, transparent 100%)",
        }}
      >
        {/* Top edge highlight — glass rim */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

        {/* Diagonal shine */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl">
          <div className="absolute -top-1/2 -left-1/4 h-[200%] w-[55%] rotate-25 bg-linear-to-b from-white/10 via-white/3 to-transparent" />
        </div>

        <div className="relative z-10 px-8 pt-10 pb-8">
          <div className="mb-6 flex flex-col items-center">
            <div
              className="relative flex items-center justify-center"
              style={{ perspective: "800px" }}
            >
              <div
                ref={logoGlowRef}
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(124,58,237,0.25) 45%, transparent 70%)",
                }}
              />
              <SoloDevLogo
                ref={logoRef}
                className="h-auto w-72 opacity-0 will-change-transform select-none"
              />
            </div>

            <p
              ref={subtitleRef}
              className="mt-3 h-5 text-sm text-zinc-400 opacity-0"
            />
          </div>

          {error && (
            <div
              ref={errorRef}
              className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="opacity-0">
              <Input
                label="Nome"
                type="text"
                placeholder="Seu nome de Hunter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={submitDisabled}
                className="field-glow"
              />
            </div>
            <div className="opacity-0">
              <Input
                label="E-mail"
                type="email"
                placeholder="hunter@solodev.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitDisabled}
                className="field-glow"
              />
            </div>
            <div className="opacity-0">
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={submitDisabled}
                className="field-glow"
              />
            </div>
            <div className="opacity-0">
              <Button
                type="submit"
                className="field-glow mt-2 w-full"
                loading={loading}
                disabled={submitDisabled}
              >
                Criar conta
              </Button>
            </div>
          </form>

          <p
            ref={linkRef}
            className="mt-6 text-center text-sm text-zinc-500 opacity-0"
          >
            Já é Hunter?{" "}
            <a
              href="/login"
              onClick={handleGoToLogin}
              className="text-violet-400 transition-colors hover:text-violet-300"
            >
              Entrar
            </a>
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-violet-600/5 via-purple-500/2 to-transparent" />
        <div className="pointer-events-none absolute -bottom-6 left-1/2 h-12 w-2/3 -translate-x-1/2 rounded-full bg-violet-500/8 blur-2xl" />
      </div>
    </div>
  );
}
