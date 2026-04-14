import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import {
  getCourse,
  type CourseDetail as CourseDetailType,
} from "../services/courseService";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  return `${m} min`;
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getCourse(Number(id))
      .then(setCourse)
      .catch((err) =>
        setError(
          err.response?.data?.error?.message || "Erro ao carregar curso",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <Skeleton className="h-7 w-64" />
          <Skeleton className="mt-2 h-4 w-40" />
        </div>
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-400">{error || "Curso não encontrado"}</p>
        <Link to="/courses">
          <Button variant="secondary">Voltar às missões</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Header
        title={course.title}
        subtitle={`${course.rank_required}-Rank · ${course.modules.length} módulos`}
        action={
          <Link to="/courses">
            <Button variant="ghost">← Voltar</Button>
          </Link>
        }
      />

      <div className="flex flex-col gap-6">
        {course.modules.map((mod) => (
          <div
            key={mod.id}
            className="rounded-2xl border border-white/6 bg-white/3 p-5"
          >
            <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-zinc-500">
              Módulo {mod.order_index} — {mod.title}
            </h3>
            <ul className="flex flex-col gap-0.5">
              {mod.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-all duration-150 hover:bg-white/4"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle
                        size={16}
                        className="text-violet-400"
                      />
                      <span>
                        {lesson.order_index}. {lesson.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-600">
                      {formatDuration(lesson.duration_s)}
                      {lesson.xp_reward > 0 && ` · +${lesson.xp_reward} XP`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
