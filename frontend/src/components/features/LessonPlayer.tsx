import { Video } from "lucide-react";

interface LessonPlayerProps {
  videoUrl: string | null;
  title: string;
}

export default function LessonPlayer({ videoUrl, title }: LessonPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/6 bg-white/2">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
            <Video size={24} className="text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400">
              Conteúdo em breve
            </p>
            <p className="mt-1 text-xs text-zinc-600">{title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-white/6">
      <iframe
        src={videoUrl}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
