import { Link } from "react-router-dom";
import Card from "../ui/Card";
import type { Course } from "../../services/courseService";

const rankColors: Record<string, string> = {
  E: "text-zinc-400",
  D: "text-green-400",
  C: "text-blue-400",
  B: "text-violet-400",
  A: "text-orange-400",
  S: "text-red-400",
};

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  if (course.locked) {
    return (
      <Card className="opacity-60">
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-xs font-bold ${rankColors[course.rank_required] || "text-zinc-400"}`}>
              {course.rank_required}-Rank
            </span>
            <h3 className="mt-1 text-lg font-semibold text-zinc-300">{course.title}</h3>
          </div>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
            Requer Awakening
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Link to={`/courses/${course.id}`}>
      <Card variant="highlighted" className="transition-transform hover:scale-[1.01]">
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-xs font-bold ${rankColors[course.rank_required] || "text-zinc-400"}`}>
              {course.rank_required}-Rank
            </span>
            <h3 className="mt-1 text-lg font-semibold text-zinc-100">{course.title}</h3>
          </div>
          <span className="text-violet-400">→</span>
        </div>
      </Card>
    </Link>
  );
}
