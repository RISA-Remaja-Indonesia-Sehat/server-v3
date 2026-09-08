import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import profileRoutes from "./routes/profile.routes";
import consentRoutes from "./routes/consent.routes";
import childRoutes from "./routes/child.route";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000/guardian/login", "https://risa-v2.vercel.app/", "https://risa-v2.vercel.app/login"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/me", profileRoutes);
app.use("/api/consent", consentRoutes);
app.use("/api/child", childRoutes);

export default app;