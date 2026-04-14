import type { Request, Response, NextFunction } from "express";
import * as courseService from "../services/course.service.js";
import { findUserById } from "../repositories/user.repository.js";

export async function listCourses(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await findUserById(req.userId!);
    const courses = await courseService.listCourses(user?.plan ?? "free");
    res.json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
}

export async function getCourse(req: Request, res: Response, next: NextFunction) {
  try {
    const courseId = Number(req.params.id);
    const user = await findUserById(req.userId!);
    const course = await courseService.getCourseDetail(courseId, user?.plan ?? "free");
    res.json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
}

export async function getLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const lessonId = Number(req.params.lessonId);
    const user = await findUserById(req.userId!);
    const lesson = await courseService.getLesson(lessonId, user?.plan ?? "free");
    res.json({ success: true, data: lesson });
  } catch (err) {
    next(err);
  }
}
