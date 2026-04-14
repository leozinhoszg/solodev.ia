import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";

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

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});

export default app;
