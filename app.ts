import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import profileRoutes from "./routes/profile.routes";

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

export default app;