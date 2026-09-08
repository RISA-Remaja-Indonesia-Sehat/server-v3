import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import profileRoutes from "./routes/profile.routes";
import consentRoutes from "./routes/consent.routes";
import childRoutes from "./routes/child.route";
import cookieParser from "cookie-parser";

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

export default app;