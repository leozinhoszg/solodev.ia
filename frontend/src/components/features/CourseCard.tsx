import ModuleCard from "./ModuleCard";
import type { Course } from "../../services/courseService";

const rankTone: Record<string, "zinc" | "green" | "blue" | "violet" | "orange" | "red"> = {
  E: "zinc",
  D: "green",
  C: "blue",
  B: "violet",
  A: "orange",
  S: "red",
};

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const tone = rankTone[course.rank_required] ?? "zinc";
  const imageFallback =
    course.rank_required === "S" || course.rank_required === "A" ? "violet" : "blue";

  return (
    <ModuleCard
      title={course.title}
      imageFallback={imageFallback}
      badge={{ text: `${course.rank_required}-Rank`, tone }}
      locked={course.locked}
      lockedReason={course.locked ? "Requer Awakening" : undefined}
      href={course.locked ? undefined : `/courses/${course.id}`}
    />
  );
}
