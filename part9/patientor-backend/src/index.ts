import express, { Request, Response } from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import diagnoses, { Diagnosis } from "./data/diagnoses";
import patients, {
  getNonSensitivePatients,
  NonSensitivePatient,
  Patient,
} from "./data/patients";

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

app.post("/api/patients", (req: Request<Omit<Patient, "id">>, res) => {
  patients.push({ ...req.body, id: uuid() });
  res.status(200).json({ success: "patient added" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
