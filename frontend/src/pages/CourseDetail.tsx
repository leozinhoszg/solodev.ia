import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import PageHero from "../components/layout/PageHero";
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
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
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

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const planet = course.rank_required === "S" || course.rank_required === "A"
    ? "violet"
    : "blue";

  return (
    <div className="flex flex-col gap-8">
      <PageHero
        eyebrow={`${course.rank_required}-Rank · ${course.modules.length} módulos · ${totalLessons} lições`}
        title={course.title}
        planet={planet}
      >
        <div className="mt-6 flex gap-3">
          <Link to="/courses">
            <Button variant="secondary">← Voltar</Button>
          </Link>
        </div>
      </PageHero>

      <div className="flex flex-col gap-4">
        {course.modules.map((mod) => (
          <Card key={mod.id} variant="glass" rim>
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-violet-400">
              Módulo {mod.order_index} — {mod.title}
            </h3>
            <ul className="flex flex-col gap-0.5">
              {mod.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-all duration-150 hover:bg-white/5 hover:text-zinc-100"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle size={16} className="text-violet-400" />
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
          </Card>
        ))}
      </div>
    </div>
  );
}
