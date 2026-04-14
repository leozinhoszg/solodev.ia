import api from "./api";

export interface Course {
  id: number;
  title: string;
  rank_required: string;
  plan_required: "free" | "pro";
  order_index: number;
  locked: boolean;
}

export interface Lesson {
  id: number;
  module_id: number;
  title: string;
  video_provider: string;
  video_id: string | null;
  video_url: string | null;
  duration_s: number | null;
  xp_reward: number;
  order_index: number;
}

export interface Module {
  id: number;
  course_id: number;
  title: string;
  order_index: number;
  lessons: Lesson[];
}

export interface CourseDetail extends Course {
  modules: Module[];
}

export async function listCourses(): Promise<Course[]> {
  const { data } = await api.get<{ success: true; data: Course[] }>("/courses");
  return data.data;
}

export async function getCourse(courseId: number): Promise<CourseDetail> {
  const { data } = await api.get<{ success: true; data: CourseDetail }>(`/courses/${courseId}`);
  return data.data;
}

export async function getLesson(courseId: number, lessonId: number): Promise<Lesson> {
  const { data } = await api.get<{ success: true; data: Lesson }>(`/courses/${courseId}/lessons/${lessonId}`);
  return data.data;
}
