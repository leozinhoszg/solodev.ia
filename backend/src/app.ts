import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import promptRoutes from "./routes/prompt.routes.js";
import gamificationRoutes from "./routes/gamification.routes.js";
import dungeonRoutes from "./routes/dungeon.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import docsRoutes from "./routes/docs.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Security
app.use(helmet());
app.use(
  cors({
    origin: env.ALLOWED_ORIGINS.split(","),
    credentials: true,
  }),
);

// Parsing
app.use(express.json());
app.use(cookieParser());

// Root — service info
app.get("/", (_req, res) => {
  res.json({
    success: true,
    data: {
      name: "SoloDev.AI Backend",
      status: "running",
      version: "1.0.0",
      uptime: process.uptime(),
      endpoints: {
        health: "/api/health",
        docs: "/api/docs",
        auth: "/api/auth",
        courses: "/api/courses",
        progress: "/api/progress",
        prompts: "/api/prompts",
        gamification: "/api/gamification",
        dungeons: "/api/dungeons",
        payments: "/api/payments",
        admin: "/api/admin",
      },
    },
  });
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

// API docs (HTML page + JSON)
app.use("/api", docsRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/gamification", gamificationRoutes);
app.use("/api/dungeons", dungeonRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});

export default app;
