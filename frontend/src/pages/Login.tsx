import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: implementar no Sprint 2
    console.log("login", { email, password });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-zinc-100">
            <span className="text-violet-400">SoloDev</span>.AI
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Entre para continuar sua jornada
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          />
          <Button type="submit" className="mt-2 w-full">
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Ainda não é Hunter?{" "}
          <Link to="/register" className="text-violet-400 hover:underline">
            Criar conta
          </Link>
        </p>
      </Card>
    </div>
  );
}
