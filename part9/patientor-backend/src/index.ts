import express, { Response } from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import diagnoses, { Diagnosis } from "./data/diagnoses";
import patients, {
  getNonSensitivePatients,
  NonSensitivePatient,
} from "./data/patients";
import { toNewPatient } from "./validation/patient";
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

app.get("/api/patients", (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(getNonSensitivePatients());
});

app.post("/api/patients", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    patients.push({
      ...newPatient,
      id: uuid(),
    });
    res.status(200).json({ success: "patient added" });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "zod validation error", issues: error.issues });
    } else {
      res.status(500).json({ error: "unknown error" });
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
