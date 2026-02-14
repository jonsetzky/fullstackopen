import express, { Response } from "express";
import { v4 as uuid } from "uuid";
import patientsData, { getNonSensitivePatients } from "../data/patients";
import { toNewEntry, toNewPatient } from "../validation/patient";
import { NonSensitivePatient } from "../types";

const router = express.Router();

let patients = patientsData;

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
  const newPatient = toNewPatient(req.body);

  patients.push({
    ...newPatient,
    id: uuid(),
    entries: [], // todo?
  });
  res.status(200).json({ success: "patient added" });
});

router.post("/:id/entries", (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: "body is missing" });
    return;
  }
  const id = req.params.id;

  if (!patients.find((patient) => patient.id === id)) {
    res.status(404).send({ error: "patient not found" });
    return;
  }

  let newEntry = { ...toNewEntry(req.body), id: uuid() };

  patients = patients.map((patient) => {
    if (patient.id !== id) return patient;

    return {
      ...patient,
      entries: [...patient.entries, newEntry],
    };
  });

  res.status(200).json(newEntry);
});

export default router;
