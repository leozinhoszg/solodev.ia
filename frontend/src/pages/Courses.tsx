import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Skeleton from "../components/ui/Skeleton";
import PageHero from "../components/layout/PageHero";
import CourseCard from "../components/features/CourseCard";
import { listCourses, type Course } from "../services/courseService";
import { staggerCards } from "../lib/animations";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      staggerCards(".course-card", { delay: 0.2, stagger: 0.08 });
    }, gridRef);
    return () => ctx.revert();
  }, [loading]);

  return (
    <div className="flex flex-col gap-8">
      <PageHero
        eyebrow="Sistema de Caçadas"
        title="Escolha sua missão."
        subtitle="Suba de rank percorrendo cursos gamificados. Cada lição te aproxima do próximo nível."
        planet="violet"
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
