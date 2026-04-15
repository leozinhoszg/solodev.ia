import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Award,
  Target,
  Castle,
  Trash2,
  Plus,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import * as admin from "../services/adminService";

type Tab =
  | "dashboard"
  | "users"
  | "courses"
  | "badges"
  | "quests"
  | "dungeons";

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Usuários", icon: Users },
  { id: "courses", label: "Cursos", icon: BookOpen },
  { id: "badges", label: "Badges", icon: Award },
  { id: "quests", label: "Quests", icon: Target },
  { id: "dungeons", label: "Dungeons", icon: Castle },
];

export default function Admin() {
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState<Tab>("dashboard");

  if (!user) return null;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Painel Admin</h1>
        <p className="text-sm text-zinc-500">Gerencie toda a plataforma SoloDev.AI</p>
      </header>

      <nav className="mb-6 flex flex-wrap gap-2 border-b border-white/6 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30"
                : "text-zinc-400 hover:bg-white/4 hover:text-zinc-200"
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "dashboard" && <Dashboard />}
      {tab === "users" && <UsersTab />}
      {tab === "courses" && <CoursesTab />}
      {tab === "badges" && <BadgesTab />}
      {tab === "quests" && <QuestsTab />}
      {tab === "dungeons" && <DungeonsTab />}
    </div>
  );
}

// ============ DASHBOARD ============
function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    admin.getStats().then(setStats).catch(() => {});
  }, []);
  if (!stats) return <div className="text-zinc-500">Carregando…</div>;
  const cards = [
    { label: "Usuários", value: stats.users, color: "from-violet-700 to-violet-500" },
    { label: "Usuários PRO", value: stats.pro_users, color: "from-amber-600 to-amber-400" },
    { label: "Cursos", value: stats.courses, color: "from-blue-600 to-blue-400" },
    { label: "Lições", value: stats.lessons, color: "from-cyan-600 to-cyan-400" },
    { label: "Badges", value: stats.badges, color: "from-pink-600 to-pink-400" },
    { label: "Quests", value: stats.quests, color: "from-green-600 to-green-400" },
    { label: "Dungeons", value: stats.dungeons, color: "from-red-600 to-red-400" },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border border-white/6 bg-white/3 p-5"
        >
          <div
            className={`mb-3 h-1 w-10 rounded-full bg-linear-to-r ${c.color}`}
          />
          <p className="text-xs text-zinc-500">{c.label}</p>
          <p className="mt-1 text-3xl font-bold text-slate-100">{c.value ?? 0}</p>
        </div>
      ))}
    </div>
  );
}

// ============ SHARED UI ============
const inputCls =
  "rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-violet-500/50";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-surface glass-rim-top rounded-xl">
      <div className="relative z-10 p-5">{children}</div>
    </div>
  );
}

function PrimaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function IconBtn({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-2 transition-colors ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}

async function confirmDelete(msg: string) {
  return window.confirm(msg);
}

// ============ USERS ============
function UsersTab() {
  const [users, setUsers] = useState<any[]>([]);
  const load = () => admin.listUsers().then(setUsers);
  useEffect(() => { load(); }, []);

  const update = async (id: number, data: any) => {
    await admin.updateUser(id, data);
    load();
  };
  const remove = async (id: number) => {
    if (!(await confirmDelete("Excluir usuário?"))) return;
    await admin.deleteUser(id);
    load();
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/6 text-left text-xs uppercase text-zinc-500">
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Nome</th>
              <th className="px-2 py-2">E-mail</th>
              <th className="px-2 py-2">Plano</th>
              <th className="px-2 py-2">Role</th>
              <th className="px-2 py-2">Rank</th>
              <th className="px-2 py-2">XP</th>
              <th className="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/4 text-zinc-300">
                <td className="px-2 py-2 font-mono text-xs text-zinc-500">{u.id}</td>
                <td className="px-2 py-2">{u.name}</td>
                <td className="px-2 py-2 text-zinc-400">{u.email}</td>
                <td className="px-2 py-2">
                  <select
                    defaultValue={u.plan}
                    onChange={(e) => update(u.id, { plan: e.target.value })}
                    className={inputCls}
                  >
                    <option value="free">free</option>
                    <option value="pro">pro</option>
                  </select>
                </td>
                <td className="px-2 py-2">
                  <select
                    defaultValue={u.role}
                    onChange={(e) => update(u.id, { role: e.target.value })}
                    className={inputCls}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="px-2 py-2">
                  <select
                    defaultValue={u.current_rank}
                    onChange={(e) => update(u.id, { current_rank: e.target.value })}
                    className={inputCls}
                  >
                    {["E", "D", "C", "B", "A", "S"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-2 font-mono">{u.total_xp}</td>
                <td className="px-2 py-2 text-right">
                  <IconBtn danger onClick={() => remove(u.id)}>
                    <Trash2 size={16} />
                  </IconBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ============ COURSES (with nested modules & lessons) ============
function CoursesTab() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const load = () => admin.listCourses().then(setCourses);
  useEffect(() => { load(); }, []);

  const create = async () => {
    const title = prompt("Título do curso:");
    if (!title) return;
    await admin.createCourse({
      title,
      rank_required: "E",
      plan_required: "free",
      order_index: courses.length,
    });
    load();
  };
  const update = async (id: number, data: any) => {
    await admin.updateCourse(id, data);
    load();
  };
  const remove = async (id: number) => {
    if (!(await confirmDelete("Excluir curso? Módulos/lições podem quebrar."))) return;
    await admin.deleteCourse(id);
    if (selected === id) setSelected(null);
    load();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-slate-100">Cursos</h2>
          <PrimaryBtn onClick={create}>
            <Plus size={14} /> Novo
          </PrimaryBtn>
        </div>
        <ul className="flex flex-col gap-2">
          {courses.map((c) => (
            <li
              key={c.id}
              className={`rounded-lg border p-3 ${
                selected === c.id
                  ? "border-violet-500/40 bg-violet-500/5"
                  : "border-white/6 bg-black/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  defaultValue={c.title}
                  onBlur={(e) => e.target.value !== c.title && update(c.id, { title: e.target.value })}
                  className={`${inputCls} flex-1`}
                />
                <select
                  defaultValue={c.rank_required}
                  onChange={(e) => update(c.id, { rank_required: e.target.value })}
                  className={inputCls}
                >
                  {["E", "D", "C", "B", "A", "S"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <select
                  defaultValue={c.plan_required}
                  onChange={(e) => update(c.id, { plan_required: e.target.value })}
                  className={inputCls}
                >
                  <option value="free">free</option>
                  <option value="pro">pro</option>
                </select>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => setSelected(selected === c.id ? null : c.id)}
                  className="text-xs text-violet-400 hover:text-violet-300"
                >
                  {selected === c.id ? "Fechar" : "Ver módulos"}
                </button>
                <IconBtn danger onClick={() => remove(c.id)}>
                  <Trash2 size={14} />
                </IconBtn>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {selected && <ModulesPanel courseId={selected} />}
    </div>
  );
}

function ModulesPanel({ courseId }: { courseId: number }) {
  const [modules, setModules] = useState<any[]>([]);
  const [selectedMod, setSelectedMod] = useState<number | null>(null);
  const load = () => admin.listModules(courseId).then(setModules);
  useEffect(() => { setSelectedMod(null); load(); }, [courseId]);

  const create = async () => {
    const title = prompt("Título do módulo:");
    if (!title) return;
    await admin.createModule({ course_id: courseId, title, order_index: modules.length });
    load();
  };
  const update = async (id: number, data: any) => {
    await admin.updateModule(id, data);
    load();
  };
  const remove = async (id: number) => {
    if (!(await confirmDelete("Excluir módulo?"))) return;
    await admin.deleteModule(id);
    load();
  };

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-slate-100">Módulos</h2>
        <PrimaryBtn onClick={create}>
          <Plus size={14} /> Novo módulo
        </PrimaryBtn>
      </div>
      <ul className="flex flex-col gap-2">
        {modules.map((m) => (
          <li key={m.id} className="rounded-lg border border-white/6 bg-black/20 p-3">
            <div className="flex items-center gap-2">
              <input
                defaultValue={m.title}
                onBlur={(e) => e.target.value !== m.title && update(m.id, { title: e.target.value })}
                className={`${inputCls} flex-1`}
              />
              <input
                type="number"
                defaultValue={m.order_index}
                onBlur={(e) => update(m.id, { order_index: Number(e.target.value) })}
                className={`${inputCls} w-16`}
              />
              <IconBtn danger onClick={() => remove(m.id)}>
                <Trash2 size={14} />
              </IconBtn>
            </div>
            <button
              onClick={() => setSelectedMod(selectedMod === m.id ? null : m.id)}
              className="mt-2 text-xs text-violet-400 hover:text-violet-300"
            >
              {selectedMod === m.id ? "Fechar lições" : "Ver lições"}
            </button>
            {selectedMod === m.id && <LessonsPanel moduleId={m.id} />}
          </li>
        ))}
        {!modules.length && (
          <li className="text-center text-xs text-zinc-500">Sem módulos ainda.</li>
        )}
      </ul>
    </Card>
  );
}

function LessonsPanel({ moduleId }: { moduleId: number }) {
  const [lessons, setLessons] = useState<any[]>([]);
  const load = () => admin.listLessons(moduleId).then(setLessons);
  useEffect(() => { load(); }, [moduleId]);

  const create = async () => {
    const title = prompt("Título da lição:");
    if (!title) return;
    await admin.createLesson({
      module_id: moduleId,
      title,
      order_index: lessons.length,
      xp_reward: 20,
    });
    load();
  };
  const update = async (id: number, data: any) => {
    await admin.updateLesson(id, data);
    load();
  };
  const remove = async (id: number) => {
    if (!(await confirmDelete("Excluir lição?"))) return;
    await admin.deleteLesson(id);
    load();
  };

  return (
    <div className="mt-3 space-y-2 border-l-2 border-violet-500/30 pl-3">
      <div className="flex justify-end">
        <PrimaryBtn onClick={create}>
          <Plus size={12} /> Nova lição
        </PrimaryBtn>
      </div>
      {lessons.map((l) => (
        <div
          key={l.id}
          className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 rounded-lg border border-white/6 bg-black/30 p-2"
        >
          <input
            defaultValue={l.title}
            onBlur={(e) => e.target.value !== l.title && update(l.id, { title: e.target.value })}
            className={`${inputCls} text-xs`}
          />
          <input
            placeholder="video_id"
            defaultValue={l.video_id ?? ""}
            onBlur={(e) => update(l.id, { video_id: e.target.value || null })}
            className={`${inputCls} w-28 text-xs`}
          />
          <input
            type="number"
            placeholder="XP"
            defaultValue={l.xp_reward}
            onBlur={(e) => update(l.id, { xp_reward: Number(e.target.value) })}
            className={`${inputCls} w-16 text-xs`}
          />
          <input
            type="number"
            placeholder="ordem"
            defaultValue={l.order_index}
            onBlur={(e) => update(l.id, { order_index: Number(e.target.value) })}
            className={`${inputCls} w-14 text-xs`}
          />
          <IconBtn danger onClick={() => remove(l.id)}>
            <Trash2 size={14} />
          </IconBtn>
        </div>
      ))}
      {!lessons.length && <p className="text-xs text-zinc-500">Sem lições.</p>}
    </div>
  );
}

// ============ BADGES ============
function BadgesTab() {
  const [badges, setBadges] = useState<any[]>([]);
  const [form, setForm] = useState({ slug: "", name: "", description: "", rank_tier: "E" });
  const load = () => admin.listBadges().then(setBadges);
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.slug || !form.name) return alert("Slug e nome obrigatórios");
    await admin.createBadge(form);
    setForm({ slug: "", name: "", description: "", rank_tier: "E" });
    load();
  };
  const update = async (id: number, data: any) => {
    await admin.updateBadge(id, data);
    load();
  };
  const remove = async (id: number) => {
    if (!(await confirmDelete("Excluir badge?"))) return;
    await admin.deleteBadge(id);
    load();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card>
        <h3 className="mb-3 font-semibold text-slate-100">Novo badge</h3>
        <div className="flex flex-col gap-2">
          <input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} />
          <input placeholder="nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          <textarea placeholder="descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} rows={2} />
          <select value={form.rank_tier} onChange={(e) => setForm({ ...form, rank_tier: e.target.value })} className={inputCls}>
            {["E", "D", "C", "B", "A", "S"].map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <PrimaryBtn onClick={create}><Plus size={14} /> Criar</PrimaryBtn>
        </div>
      </Card>
      <Card>
        <ul className="flex flex-col gap-2">
          {badges.map((b) => (
            <li key={b.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 rounded-lg border border-white/6 bg-black/20 p-2">
              <span className="font-mono text-xs text-zinc-500">#{b.id}</span>
              <input defaultValue={b.name} onBlur={(e) => e.target.value !== b.name && update(b.id, { name: e.target.value })} className={inputCls} />
              <select defaultValue={b.rank_tier} onChange={(e) => update(b.id, { rank_tier: e.target.value })} className={inputCls}>
                {["E", "D", "C", "B", "A", "S"].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <IconBtn danger onClick={() => remove(b.id)}><Trash2 size={14} /></IconBtn>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

// ============ QUESTS ============
function QuestsTab() {
  const [quests, setQuests] = useState<any[]>([]);
  const [form, setForm] = useState({ slug: "", title: "", description: "", type: "main", xp_reward: 50, reset_daily: false });
  const load = () => admin.listQuests().then(setQuests);
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.slug || !form.title) return alert("Slug e título obrigatórios");
    await admin.createQuest(form);
    setForm({ slug: "", title: "", description: "", type: "main", xp_reward: 50, reset_daily: false });
    load();
  };
  const update = async (id: number, data: any) => {
    await admin.updateQuest(id, data);
    load();
  };
  const remove = async (id: number) => {
    if (!(await confirmDelete("Excluir quest?"))) return;
    await admin.deleteQuest(id);
    load();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card>
        <h3 className="mb-3 font-semibold text-slate-100">Nova quest</h3>
        <div className="flex flex-col gap-2">
          <input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} />
          <input placeholder="título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
          <textarea placeholder="descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} rows={2} />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}>
            <option value="main">main</option>
            <option value="daily">daily</option>
            <option value="side">side</option>
          </select>
          <input type="number" placeholder="XP" value={form.xp_reward} onChange={(e) => setForm({ ...form, xp_reward: Number(e.target.value) })} className={inputCls} />
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input type="checkbox" checked={form.reset_daily} onChange={(e) => setForm({ ...form, reset_daily: e.target.checked })} />
            Reset diário
          </label>
          <PrimaryBtn onClick={create}><Plus size={14} /> Criar</PrimaryBtn>
        </div>
      </Card>
      <Card>
        <ul className="flex flex-col gap-2">
          {quests.map((q) => (
            <li key={q.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-2 rounded-lg border border-white/6 bg-black/20 p-2">
              <span className="font-mono text-xs text-zinc-500">#{q.id}</span>
              <input defaultValue={q.title} onBlur={(e) => e.target.value !== q.title && update(q.id, { title: e.target.value })} className={inputCls} />
              <select defaultValue={q.type} onChange={(e) => update(q.id, { type: e.target.value })} className={inputCls}>
                <option value="main">main</option>
                <option value="daily">daily</option>
                <option value="side">side</option>
              </select>
              <input type="number" defaultValue={q.xp_reward} onBlur={(e) => update(q.id, { xp_reward: Number(e.target.value) })} className={`${inputCls} w-20`} />
              <IconBtn danger onClick={() => remove(q.id)}><Trash2 size={14} /></IconBtn>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

// ============ DUNGEONS ============
function DungeonsTab() {
  const [dungeons, setDungeons] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [form, setForm] = useState({ slug: "", title: "", description: "", rank_required: "C", xp_reward: 200 });
  const load = () => admin.listDungeons().then(setDungeons);
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.slug || !form.title) return alert("Slug e título obrigatórios");
    await admin.createDungeon(form);
    setForm({ slug: "", title: "", description: "", rank_required: "C", xp_reward: 200 });
    load();
  };
  const update = async (id: number, data: any) => {
    await admin.updateDungeon(id, data);
    load();
  };
  const remove = async (id: number) => {
    if (!(await confirmDelete("Excluir dungeon?"))) return;
    await admin.deleteDungeon(id);
    if (selected === id) setSelected(null);
    load();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card>
        <h3 className="mb-3 font-semibold text-slate-100">Nova dungeon</h3>
        <div className="flex flex-col gap-2">
          <input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} />
          <input placeholder="título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
          <textarea placeholder="descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} rows={2} />
          <select value={form.rank_required} onChange={(e) => setForm({ ...form, rank_required: e.target.value })} className={inputCls}>
            {["C", "B", "A", "S"].map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <input type="number" placeholder="XP" value={form.xp_reward} onChange={(e) => setForm({ ...form, xp_reward: Number(e.target.value) })} className={inputCls} />
          <PrimaryBtn onClick={create}><Plus size={14} /> Criar</PrimaryBtn>
        </div>
      </Card>
      <Card>
        <ul className="flex flex-col gap-2">
          {dungeons.map((d) => (
            <li key={d.id} className="rounded-lg border border-white/6 bg-black/20 p-3">
              <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2">
                <input defaultValue={d.title} onBlur={(e) => e.target.value !== d.title && update(d.id, { title: e.target.value })} className={inputCls} />
                <select defaultValue={d.rank_required} onChange={(e) => update(d.id, { rank_required: e.target.value })} className={inputCls}>
                  {["C", "B", "A", "S"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <input type="number" defaultValue={d.xp_reward} onBlur={(e) => update(d.id, { xp_reward: Number(e.target.value) })} className={`${inputCls} w-20`} />
                <IconBtn danger onClick={() => remove(d.id)}><Trash2 size={14} /></IconBtn>
              </div>
              <button onClick={() => setSelected(selected === d.id ? null : d.id)} className="mt-2 text-xs text-violet-400 hover:text-violet-300">
                {selected === d.id ? "Fechar checkpoints" : "Ver checkpoints"}
              </button>
              {selected === d.id && <CheckpointsPanel dungeonId={d.id} />}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function CheckpointsPanel({ dungeonId }: { dungeonId: number }) {
  const [items, setItems] = useState<any[]>([]);
  const [desc, setDesc] = useState("");
  const load = () => admin.listCheckpoints(dungeonId).then(setItems);
  useEffect(() => { load(); }, [dungeonId]);

  const create = async () => {
    if (!desc) return;
    await admin.createCheckpoint({ dungeon_id: dungeonId, description: desc, order_index: items.length });
    setDesc("");
    load();
  };
  const update = async (id: number, data: any) => {
    await admin.updateCheckpoint(id, data);
    load();
  };
  const remove = async (id: number) => {
    if (!(await confirmDelete("Excluir checkpoint?"))) return;
    await admin.deleteCheckpoint(id);
    load();
  };

  return (
    <div className="mt-3 space-y-2 border-l-2 border-violet-500/30 pl-3">
      <div className="flex gap-2">
        <input placeholder="Nova descrição" value={desc} onChange={(e) => setDesc(e.target.value)} className={`${inputCls} flex-1 text-xs`} />
        <PrimaryBtn onClick={create}><Plus size={12} /></PrimaryBtn>
      </div>
      {items.map((cp) => (
        <div key={cp.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg border border-white/6 bg-black/30 p-2">
          <input defaultValue={cp.description} onBlur={(e) => e.target.value !== cp.description && update(cp.id, { description: e.target.value })} className={`${inputCls} text-xs`} />
          <input type="number" defaultValue={cp.order_index} onBlur={(e) => update(cp.id, { order_index: Number(e.target.value) })} className={`${inputCls} w-14 text-xs`} />
          <IconBtn danger onClick={() => remove(cp.id)}><Trash2 size={14} /></IconBtn>
        </div>
      ))}
    </div>
  );
}
