import { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Skeleton from "../components/ui/Skeleton";
import CourseCard from "../components/features/CourseCard";
import { listCourses, type Course } from "../services/courseService";
import { useStaggered } from "../hooks/useStaggered";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const staggered = useStaggered(loading ? 0 : courses.length);

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Sistema de Caçadas"
        subtitle="Escolha sua missão e suba de rank."
      />

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((course, i) => (
            <div
              key={course.id}
              className={`transition-all duration-300 ease-out ${staggered[i] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
