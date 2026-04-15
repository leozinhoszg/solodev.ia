import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import LessonPlayer from "../components/features/LessonPlayer";
import { getLesson, type Lesson as LessonType } from "../services/courseService";
import { completeLesson } from "../services/progressService";

export default function Lesson() {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    if (!id || !lessonId) return;
    getLesson(Number(id), Number(lessonId))
      .then(setLesson)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, lessonId]);

  async function handleComplete() {
    if (!lessonId || completed) return;
    setCompleting(true);
    try {
      const result = await completeLesson(Number(lessonId));
      setCompleted(true);
      setXpEarned(result.xpEarned);
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-12 w-48" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-400">Aula não encontrada</p>
        <Link to={`/courses/${id}`}>
          <Button variant="secondary">Voltar ao curso</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header strip */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            to={`/courses/${id}`}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-violet-300"
          >
            <ArrowLeft size={14} /> Voltar ao curso
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 lg:text-3xl">
            {lesson.title}
          </h1>
          <p className="mt-1 font-mono text-xs text-violet-400">
            +{lesson.xp_reward} XP ao completar
          </p>
        </div>
      </div>

      {/* Player framed in glass */}
      <Card variant="glass-violet" rim className="!p-3">
        <LessonPlayer videoUrl={lesson.video_url} title={lesson.title} />
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {completed && xpEarned > 0 && (
          <div className="animate-fade-in-up flex items-center gap-2">
            <CheckCircle
              size={18}
              className="animate-glow-pulse text-emerald-400"
            />
            <p className="font-mono text-sm font-bold text-emerald-400">
              +{xpEarned} XP conquistados!
            </p>
          </div>
        )}
        {completed && xpEarned === 0 && (
          <p className="text-sm text-zinc-600">
            Missão já completada anteriormente
          </p>
        )}
        {!completed && <div />}

        <Button
          onClick={handleComplete}
          loading={completing}
          disabled={completed}
          variant={completed ? "secondary" : "glass-primary"}
          size="lg"
        >
          {completed ? "Missão concluída" : "Marcar como concluída"}
        </Button>
      </div>
    </div>
  );
}
