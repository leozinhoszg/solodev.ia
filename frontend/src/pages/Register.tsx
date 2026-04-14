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
