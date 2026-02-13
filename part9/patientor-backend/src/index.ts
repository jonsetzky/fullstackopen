import express from "express";
import cors from "cors";
import diagnoses, { Diagnosis } from "./data/diagnoses";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res: express.Response<Diagnosis[]>) => {
  res.json(diagnoses);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
