import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Send, Globe, Rss } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SoloDevLogo from "../ui/SoloDevLogo";

interface FooterColumnProps {
  title: string;
  links: { label: string; to: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-zinc-400">
        {title}
      </h4>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-sm text-zinc-500 transition-colors hover:text-violet-300"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <footer className="glass-surface glass-rim-top relative mt-16 rounded-t-3xl px-6 py-12 md:px-10">
      <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <SoloDevLogo className="h-10 w-auto" />
          <p className="mt-4 text-sm text-zinc-500">
            Plataforma de aprendizado gamificada para hunters do código.
          </p>
          <div className="mt-4 flex gap-2">
            {[
              { Icon: MessageCircle, href: "#", label: "Discord" },
              { Icon: Globe, href: "#", label: "Site" },
              { Icon: Rss, href: "#", label: "Blog" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="field-glow rounded-full border border-white/8 bg-white/4 p-2 text-zinc-400 transition-colors hover:text-violet-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn
          title="Jornada"
          links={[
            { label: "Status Window", to: "/" },
            { label: "Missões", to: "/courses" },
            { label: "Sala de Treinamento", to: "/prompt-lab" },
            { label: "Dungeons", to: "/projects" },
          ]}
        />

        <FooterColumn
          title="Comunidade"
          links={[
            { label: "Ranking", to: "/" },
            { label: "Discord", to: "#" },
            { label: "Blog", to: "#" },
            { label: "Feedback", to: "#" },
          ]}
        />

        <FooterColumn
          title="Suporte"
          links={[
            { label: "FAQ", to: "#" },
            { label: "Contato", to: "#" },
            { label: "Despertar Pro", to: "/awakening" },
            { label: "Termos", to: "#" },
          ]}
        />
      </div>

      {/* Newsletter */}
      <div className="relative z-10 mt-10 border-t border-white/8 pt-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-zinc-100">
              Entre na guilda
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Receba novas missões, drops raros e atualizações direto no seu
              e-mail.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2 md:w-auto"
          >
            <Input
              type="email"
              variant="glass"
              placeholder="seu-email@hunter.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 md:w-64"
              required
              aria-label="E-mail para newsletter"
            />
            <Button type="submit" variant="glass-primary" size="md">
              {submitted ? "Enviado!" : <><Send size={14} /> Entrar</>}
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/8 pt-6 text-xs text-zinc-500 md:flex-row">
        <span>© {new Date().getFullYear()} SoloDev.AI · Todos os direitos reservados</span>
        <span className="font-mono">🇧🇷 Português (BR)</span>
      </div>
    </footer>
  );
}
