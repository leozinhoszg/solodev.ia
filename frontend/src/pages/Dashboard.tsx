import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Status Window"
        subtitle="Bem-vindo, Hunter. Continue sua jornada."
        action={<Button>Continuar onde parou</Button>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-400">Rank Atual</p>
          <p className="mt-1 text-3xl font-bold text-violet-400">E-Rank</p>
          <p className="mt-1 text-xs text-zinc-500">Initiate</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-400">XP Total</p>
          <p className="mt-1 text-3xl font-bold text-zinc-100">0</p>
          <p className="mt-1 text-xs text-zinc-500">Comece uma missão para ganhar XP</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-400">Combo de Caçadas</p>
          <p className="mt-1 text-3xl font-bold text-zinc-100">0 dias</p>
          <p className="mt-1 text-xs text-zinc-500">Complete uma missão por dia</p>
        </Card>
      </div>
    </div>
  );
}
