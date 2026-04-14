import { Router } from "express";
import * as courseCtrl from "../controllers/course.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, courseCtrl.listCourses);
router.get("/:id", requireAuth, courseCtrl.getCourse);
router.get("/:id/lessons/:lessonId", requireAuth, courseCtrl.getLesson);

export default router;
