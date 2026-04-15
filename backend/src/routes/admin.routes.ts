import { Router } from "express";
import * as c from "../controllers/admin.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();
router.use(requireAuth, requireAdmin);

router.get("/stats", c.stats);

// Users
router.get("/users", c.listUsers);
router.patch("/users/:id", c.updateUser);
router.delete("/users/:id", c.deleteUser);

// Courses
router.get("/courses", c.listCourses);
router.post("/courses", c.createCourse);
router.patch("/courses/:id", c.updateCourse);
router.delete("/courses/:id", c.deleteCourse);

// Modules
router.get("/courses/:courseId/modules", c.listModules);
router.post("/modules", c.createModule);
router.patch("/modules/:id", c.updateModule);
router.delete("/modules/:id", c.deleteModule);

// Lessons
router.get("/modules/:moduleId/lessons", c.listLessons);
router.post("/lessons", c.createLesson);
router.patch("/lessons/:id", c.updateLesson);
router.delete("/lessons/:id", c.deleteLesson);

// Badges
router.get("/badges", c.listBadges);
router.post("/badges", c.createBadge);
router.patch("/badges/:id", c.updateBadge);
router.delete("/badges/:id", c.deleteBadge);

// Quests
router.get("/quests", c.listQuests);
router.post("/quests", c.createQuest);
router.patch("/quests/:id", c.updateQuest);
router.delete("/quests/:id", c.deleteQuest);

// Dungeons
router.get("/dungeons", c.listDungeons);
router.post("/dungeons", c.createDungeon);
router.patch("/dungeons/:id", c.updateDungeon);
router.delete("/dungeons/:id", c.deleteDungeon);

// Checkpoints
router.get("/dungeons/:dungeonId/checkpoints", c.listCheckpoints);
router.post("/checkpoints", c.createCheckpoint);
router.patch("/checkpoints/:id", c.updateCheckpoint);
router.delete("/checkpoints/:id", c.deleteCheckpoint);

export default router;
