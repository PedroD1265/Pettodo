import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import petRoutes from "./routes/pets.js";
import importRoutes from "./routes/import.js";
import publicRoutes from "./routes/public.js";
import caseRoutes from "./routes/cases.js";
import imageRoutes from "./routes/images.js";
import protectedContactRoutes from "./routes/protected-contact.js";
import communityDogRoutes from "./routes/community-dogs.js";
import changeRequestRoutes from "./routes/change-requests.js";
import evidenceRoutes from "./routes/evidence.js";
import reviewRoutes from "./routes/reviews.js";
import abuseRoutes from "./routes/abuse.js";
import matchingRoutes from "./routes/matching.js";

const app = express();

const allowedOrigins: string[] = [
  "http://localhost:5000",
  "http://localhost:3000",
];
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push(
    ...process.env.ALLOWED_ORIGINS.split(",")
      .map((o) => o.trim())
      .filter(Boolean),
  );
}
if (process.env.REPLIT_DEV_DOMAIN) {
  allowedOrigins.push(`https://${process.env.REPLIT_DEV_DOMAIN}`);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (origin.endsWith(".replit.dev") || origin.endsWith(".repl.co")) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.some((o) => origin === o || origin.startsWith(o))) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS not allowed"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use("/api", authRoutes);
app.use("/api", petRoutes);
app.use("/api", importRoutes);
app.use("/api", publicRoutes);
app.use("/api", caseRoutes);
app.use("/api", imageRoutes);
app.use("/api", protectedContactRoutes);
app.use("/api", communityDogRoutes);
app.use("/api", changeRequestRoutes);
app.use("/api", evidenceRoutes);
app.use("/api", reviewRoutes);
app.use("/api", abuseRoutes);
app.use("/api", matchingRoutes);

export default app;
