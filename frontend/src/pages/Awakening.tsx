import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Shield, BookOpen, Award, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { createCheckout } from "../services/paymentService";
import { useAuthStore } from "../store/useAuthStore";
import { heroReveal } from "../lib/animations";

const features = [
  { icon: BookOpen, label: "Fases 2, 3 e 4 completas", desc: "Frontend, Backend, DB, Deploy" },
  { icon: Zap, label: "Lab de Prompts ilimitado", desc: "Treine prompts e suba Prompt Mastery" },
  { icon: Shield, label: "3 Dungeons guiados", desc: "Task Realm, Auth Fortress, The Gate" },
  { icon: Award, label: "Certificado S-Rank", desc: "Título de Solo Developer ao completar" },
];

export default function Awakening() {
  const user = useAuthStore((s) => s.user);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isPro = user?.plan === "pro";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      heroReveal(cardRef.current);
    }, cardRef);
    return () => ctx.revert();
  }, []);

  async function handleAwaken() {
    setLoading(true);
    try {
      const result = await createCheckout(
        `${window.location.origin}/?awakened=true`,
        `${window.location.origin}/awakening`,
      );
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-space relative flex min-h-screen flex-col items-center justify-center px-4 py-12 text-zinc-100">
      <div className="relative z-10 w-full max-w-lg">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-violet-300"
        >
          <ArrowLeft size={16} /> Voltar ao Status Window
        </Link>

        <div ref={cardRef} className="opacity-0">
          <Card variant="glass-violet" rim shine className="p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-700 to-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                <Zap size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-100">
                Awakening
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Você completou sua primeira dungeon. Seus atributos acordaram.
                <br />O sistema reconhece seu potencial.
              </p>
              <p className="mt-4 text-xs italic text-zinc-600">
                "Hunters que param no E-Rank nunca sabem o que poderiam ter
                construído."
              </p>
            </div>

            {/* Features */}
            <div className="mb-8 flex flex-col gap-3">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-lg border border-white/6 bg-white/[0.03] px-4 py-3 backdrop-blur-[2px]"
                >
                  <f.icon size={18} className="text-violet-400" />
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {f.label}
                    </p>
                    <p className="text-xs text-zinc-600">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            {isPro ? (
              <div className="text-center">
                <p className="text-sm font-medium text-emerald-400">
                  Você já despertou!
                </p>
                <p className="mt-1 text-xs text-zinc-600">Acesso Pro ativo</p>
              </div>
            ) : (
              <>
                <Button
                  variant="glass-primary"
                  onClick={handleAwaken}
                  loading={loading}
                  className="w-full"
                  size="lg"
                >
                  Despertar agora — R$ 47/mês
                </Button>
                <p className="mt-3 text-center text-xs text-zinc-600">
                  Cancele quando quiser. Garantia de 7 dias.
                </p>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
