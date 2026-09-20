import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import healthRouter from "./routes/health.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import consentRoutes from "./routes/consent.routes.js";
import childRoutes from "./routes/child.route.js";
import moduleRoutes from "./routes/module.route.js";
import guardianDashboardRoutes from "./routes/guardian-dashboard.route.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://risa-v2.vercel.app",],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/health", healthRouter);
app.use("/api/me", profileRoutes);
app.use("/api/consent", consentRoutes);
app.use("/api/child", childRoutes);
app.use("/api/modules", moduleRoutes);
app.use(
  "/api/guardian/dashboard",
  guardianDashboardRoutes,
);

export default app;
