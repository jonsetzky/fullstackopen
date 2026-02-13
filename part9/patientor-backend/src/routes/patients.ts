import express, { Response } from "express";
import { v4 as uuid } from "uuid";
import patients, { getNonSensitivePatients } from "../data/patients";
import { toNewPatient } from "../validation/patient";
import z from "zod";
import { NonSensitivePatient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patients.find((patient) => patient.id === id);

  if (!patient) {
    res.status(404).send({ error: "patient not found" });
    return;
  }

  res.json(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    patients.push({
      ...newPatient,
      id: uuid(),
      entries: [], // todo?
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

export default router;
