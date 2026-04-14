import { AppError } from "../utils/AppError.js";
import {
  findAllCourses,
  findCourseWithModulesAndLessons,
  findLessonWithPlan,
} from "../repositories/course.repository.js";

export async function listCourses(userPlan: "free" | "pro") {
  const courses = await findAllCourses();
  return courses.map((c) => ({
    ...c,
    locked: c.plan_required === "pro" && userPlan === "free",
  }));
}

export async function getCourseDetail(courseId: number, userPlan: "free" | "pro") {
  const course = await findCourseWithModulesAndLessons(courseId);
  if (!course) {
    throw new AppError(404, "Curso não encontrado", "COURSE_NOT_FOUND");
  }

  if (course.plan_required === "pro" && userPlan === "free") {
    throw new AppError(403, "Awakening necessário para acessar este conteúdo", "PLAN_REQUIRED");
  }

  return course;
}

export async function getLesson(lessonId: number, userPlan: "free" | "pro") {
  const lesson = await findLessonWithPlan(lessonId);
  if (!lesson) {
    throw new AppError(404, "Aula não encontrada", "LESSON_NOT_FOUND");
  }

  if (lesson.plan_required === "pro" && userPlan === "free") {
    throw new AppError(403, "Awakening necessário para acessar esta aula", "PLAN_REQUIRED");
  }

  return lesson;
}
