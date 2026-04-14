import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Header from "../components/ui/Header";
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
        <div>
          <Skeleton className="h-7 w-72" />
          <Skeleton className="mt-2 h-4 w-40" />
        </div>
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-10 w-48" />
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
      <Header
        title={lesson.title}
        subtitle={`+${lesson.xp_reward} XP ao completar`}
        action={
          <Link to={`/courses/${id}`}>
            <Button variant="ghost">← Voltar ao curso</Button>
          </Link>
        }
      />

      <LessonPlayer videoUrl={lesson.video_url} title={lesson.title} />

      <div className="flex items-center justify-between">
        {completed && xpEarned > 0 && (
          <div className="flex items-center gap-2 animate-fade-in-up">
            <CheckCircle
              size={18}
              className="text-emerald-400 animate-glow-pulse"
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
          variant={completed ? "secondary" : "primary"}
        >
          {completed ? "Missão concluída" : "Marcar como concluída"}
        </Button>
      </div>
    </div>
  );
}
