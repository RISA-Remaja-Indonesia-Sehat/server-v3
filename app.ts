import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://risa-v2.vercel.app/"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/health", healthRouter);

export default app;