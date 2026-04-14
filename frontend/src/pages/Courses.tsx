import { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import CourseCard from "../components/features/CourseCard";
import { listCourses, type Course } from "../services/courseService";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Sistema de Caçadas"
        subtitle="Escolha sua missão e suba de rank."
      />

      {loading ? (
        <div className="flex justify-center py-12">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
