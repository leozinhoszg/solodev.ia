import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
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
      <div className="flex justify-center py-12">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-400">Aula nao encontrada</p>
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
          <p className="text-sm font-medium text-emerald-400">
            +{xpEarned} XP conquistados!
          </p>
        )}
        {completed && xpEarned === 0 && (
          <p className="text-sm text-zinc-500">Missao ja completada anteriormente</p>
        )}
        {!completed && <div />}

        <Button
          onClick={handleComplete}
          loading={completing}
          disabled={completed}
          variant={completed ? "secondary" : "primary"}
        >
          {completed ? "Missao concluida" : "Marcar como concluida"}
        </Button>
      </div>
    </div>
  );
}
