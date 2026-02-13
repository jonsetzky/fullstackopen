import express, { Response } from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import diagnoses, { Diagnosis } from "./data/diagnoses";
import patients, {
  genderFromString,
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

const validateNewPatientBody = (
  value: unknown,
): value is Omit<Patient, "id" | "gender"> & { gender: string } => {
  if (typeof value !== "object" || !value) return false;
  if (!("name" in value) || typeof value.name !== "string") return false;
  if (!("dateOfBirth" in value) || typeof value.dateOfBirth !== "string")
    return false;
  if (!("ssn" in value) || typeof value.ssn !== "string") return false;
  if (!("gender" in value) || typeof value.gender !== "string") return false;
  if (!("occupation" in value) || typeof value.occupation !== "string")
    return false;
  return true;
};

app.post("/api/patients", (req, res) => {
  if (!validateNewPatientBody(req.body)) {
    res.status(400).json({ error: "malformed request body" });
    return;
  }

  patients.push({
    ...req.body,
    id: uuid(),
    gender: genderFromString(req.body.gender),
  });
  res.status(200).json({ success: "patient added" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
