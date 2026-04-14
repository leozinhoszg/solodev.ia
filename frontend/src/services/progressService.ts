import api from "./api";

export interface Attributes {
  prompt_mastery: number;
  frontend_power: number;
  backend_strength: number;
  db_knowledge: number;
  security_level: number;
  deploy_speed: number;
}

export interface NextLesson {
  lesson_id: number;
  lesson_title: string;
  course_id: number;
  course_title: string;
  module_title: string;
}

export interface ProgressSummary {
  total_lessons: number;
  completed_lessons: number;
}

export interface DashboardData {
  attributes: Attributes | null;
  nextLesson: NextLesson | null;
  summary: ProgressSummary;
  completedLessonIds: number[];
}

export interface CompleteLessonResult {
  alreadyCompleted: boolean;
  xpEarned: number;
}

export async function getDashboard(): Promise<DashboardData> {
  const { data } = await api.get<{ success: true; data: DashboardData }>("/progress/dashboard");
  return data.data;
}

export async function completeLesson(lessonId: number): Promise<CompleteLessonResult> {
  const { data } = await api.post<{ success: true; data: CompleteLessonResult }>(
    `/progress/lessons/${lessonId}/complete`,
  );
  return data.data;
}
