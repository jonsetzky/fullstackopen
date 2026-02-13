import express, { Response } from "express";
import cors from "cors";
import diagnoses, { Diagnosis } from "./data/diagnoses";
import { getNonSensitivePatients, NonSensitivePatient } from "./data/patients";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnoses);
});

app.get("/api/patients", (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(getNonSensitivePatients());
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
