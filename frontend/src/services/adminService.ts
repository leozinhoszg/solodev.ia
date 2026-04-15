import api from "./api";

const unwrap = <T,>(r: { data: { data: T } }) => r.data.data;

// ====== STATS ======
export const getStats = () => api.get("/admin/stats").then(unwrap<any>);

// ====== USERS ======
export const listUsers = () => api.get("/admin/users").then(unwrap<any[]>);
export const updateUser = (id: number, data: any) =>
  api.patch(`/admin/users/${id}`, data).then(unwrap);
export const deleteUser = (id: number) =>
  api.delete(`/admin/users/${id}`).then(unwrap);

// ====== COURSES ======
export const listCourses = () => api.get("/admin/courses").then(unwrap<any[]>);
export const createCourse = (data: any) =>
  api.post("/admin/courses", data).then(unwrap);
export const updateCourse = (id: number, data: any) =>
  api.patch(`/admin/courses/${id}`, data).then(unwrap);
export const deleteCourse = (id: number) =>
  api.delete(`/admin/courses/${id}`).then(unwrap);

// ====== MODULES ======
export const listModules = (courseId: number) =>
  api.get(`/admin/courses/${courseId}/modules`).then(unwrap<any[]>);
export const createModule = (data: any) =>
  api.post("/admin/modules", data).then(unwrap);
export const updateModule = (id: number, data: any) =>
  api.patch(`/admin/modules/${id}`, data).then(unwrap);
export const deleteModule = (id: number) =>
  api.delete(`/admin/modules/${id}`).then(unwrap);

// ====== LESSONS ======
export const listLessons = (moduleId: number) =>
  api.get(`/admin/modules/${moduleId}/lessons`).then(unwrap<any[]>);
export const createLesson = (data: any) =>
  api.post("/admin/lessons", data).then(unwrap);
export const updateLesson = (id: number, data: any) =>
  api.patch(`/admin/lessons/${id}`, data).then(unwrap);
export const deleteLesson = (id: number) =>
  api.delete(`/admin/lessons/${id}`).then(unwrap);

// ====== BADGES ======
export const listBadges = () => api.get("/admin/badges").then(unwrap<any[]>);
export const createBadge = (data: any) =>
  api.post("/admin/badges", data).then(unwrap);
export const updateBadge = (id: number, data: any) =>
  api.patch(`/admin/badges/${id}`, data).then(unwrap);
export const deleteBadge = (id: number) =>
  api.delete(`/admin/badges/${id}`).then(unwrap);

// ====== QUESTS ======
export const listQuests = () => api.get("/admin/quests").then(unwrap<any[]>);
export const createQuest = (data: any) =>
  api.post("/admin/quests", data).then(unwrap);
export const updateQuest = (id: number, data: any) =>
  api.patch(`/admin/quests/${id}`, data).then(unwrap);
export const deleteQuest = (id: number) =>
  api.delete(`/admin/quests/${id}`).then(unwrap);

// ====== DUNGEONS ======
export const listDungeons = () => api.get("/admin/dungeons").then(unwrap<any[]>);
export const createDungeon = (data: any) =>
  api.post("/admin/dungeons", data).then(unwrap);
export const updateDungeon = (id: number, data: any) =>
  api.patch(`/admin/dungeons/${id}`, data).then(unwrap);
export const deleteDungeon = (id: number) =>
  api.delete(`/admin/dungeons/${id}`).then(unwrap);

// ====== CHECKPOINTS ======
export const listCheckpoints = (dungeonId: number) =>
  api.get(`/admin/dungeons/${dungeonId}/checkpoints`).then(unwrap<any[]>);
export const createCheckpoint = (data: any) =>
  api.post("/admin/checkpoints", data).then(unwrap);
export const updateCheckpoint = (id: number, data: any) =>
  api.patch(`/admin/checkpoints/${id}`, data).then(unwrap);
export const deleteCheckpoint = (id: number) =>
  api.delete(`/admin/checkpoints/${id}`).then(unwrap);
