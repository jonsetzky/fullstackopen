import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import diagnoses, { Diagnosis } from "./data/diagnoses";

import patientRouter from "./routes/patients";
import z from "zod";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnoses);
});

app.use("/api/patients", patientRouter);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: "zod validation error", issues: err.issues });
  } else {
    next(err);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
