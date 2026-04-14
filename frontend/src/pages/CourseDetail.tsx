import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import { getCourse, type CourseDetail as CourseDetailType } from "../services/courseService";

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
      .catch((err) => setError(err.response?.data?.error?.message || "Erro ao carregar curso"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
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
          <div key={mod.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">
              Módulo {mod.order_index} — {mod.title}
            </h3>
            <ul className="flex flex-col gap-1">
              {mod.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
                  >
                    <span>
                      {lesson.order_index}. {lesson.title}
                    </span>
                    <span className="text-xs text-zinc-600">
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
