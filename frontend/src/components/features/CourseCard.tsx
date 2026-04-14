import { Link } from "react-router-dom";
import { Lock, ChevronRight } from "lucide-react";
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

const rankBorderGlow: Record<string, string> = {
  E: "hover:border-zinc-400/20 hover:shadow-[0_0_12px_rgba(161,161,170,0.1)]",
  D: "hover:border-green-400/20 hover:shadow-[0_0_12px_rgba(74,222,128,0.1)]",
  C: "hover:border-blue-400/20 hover:shadow-[0_0_12px_rgba(96,165,250,0.1)]",
  B: "hover:border-violet-400/20 hover:shadow-[0_0_12px_rgba(167,139,250,0.1)]",
  A: "hover:border-orange-400/20 hover:shadow-[0_0_12px_rgba(251,146,60,0.1)]",
  S: "hover:border-red-400/20 hover:shadow-[0_0_12px_rgba(248,113,113,0.1)]",
};

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  if (course.locked) {
    return (
      <Card className="opacity-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock size={16} className="text-zinc-600" />
            <div>
              <span
                className={`font-mono text-[10px] font-bold uppercase tracking-wider ${rankColors[course.rank_required] || "text-zinc-400"}`}
              >
                {course.rank_required}-Rank
              </span>
              <h3 className="mt-0.5 text-base font-semibold text-zinc-400">
                {course.title}
              </h3>
            </div>
          </div>
          <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
            Requer Awakening
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Link to={`/courses/${course.id}`}>
      <Card
        variant="highlighted"
        hoverable
        className={`${rankBorderGlow[course.rank_required] || ""}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span
              className={`font-mono text-[10px] font-bold uppercase tracking-wider ${rankColors[course.rank_required] || "text-zinc-400"}`}
            >
              {course.rank_required}-Rank
            </span>
            <h3 className="mt-0.5 text-base font-semibold text-slate-100">
              {course.title}
            </h3>
          </div>
          <ChevronRight size={18} className="text-violet-400" />
        </div>
      </Card>
    </Link>
  );
}
