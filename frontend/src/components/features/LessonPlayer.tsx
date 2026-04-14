interface LessonPlayerProps {
  videoUrl: string | null;
  title: string;
}

export default function LessonPlayer({ videoUrl, title }: LessonPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="text-center">
          <p className="text-zinc-400">Video em breve</p>
          <p className="mt-1 text-sm text-zinc-600">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-xl border border-zinc-800">
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
