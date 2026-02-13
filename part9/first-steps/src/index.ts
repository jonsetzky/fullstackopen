import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height_cm = Number(req.query.height);
  if (isNaN(height_cm)) {
    res.json({
      error: "height query parameter is missing or is not a number",
    });
    return;
  }

  const weight_kg = Number(req.query.weight);
  if (isNaN(weight_kg)) {
    res.json({
      error: "weight query parameter is missing or is not a number",
    });
    return;
  }

  res.json({
    weight: weight_kg,
    height: height_cm,
    bmi: calculateBmi(height_cm, weight_kg),
  });
});

const isNumberArray = (value: unknown): value is number[] => {
  return (
    Array.isArray(value) &&
    value.find((item) => isNaN(Number(item))) === undefined
  );
};

const validateExercisesBody = (
  value: unknown,
): value is { target: number; daily_exercises: number[] } => {
  if (!value) return false;
  if (typeof value != "object") return false;
  if (!("daily_exercises" in value)) return false;
  if (!("target" in value)) return false;

  return (
    isNumberArray(value.daily_exercises) && typeof value.target === "number"
  );
};

app.post("/exercises", (req, res) => {
  if (req.body === undefined) {
    res.json({
      error:
        "request body with properties 'daily_exercises' and 'target' is missing",
    });
    return;
  }
  if (!("daily_exercises" in req.body)) {
    res.json({ error: "missing parameters" });
    return;
  }

  if (!("target" in req.body)) {
    res.json({ error: "missing parameters" });
    return;
  }

  if (!validateExercisesBody(req.body)) {
    res.json({ error: "malformed request body" });
    return;
  }

  res.json(calculateExercises(req.body.daily_exercises, req.body.target));
});

app.listen(3003, () => {
  console.log("Server is running on http://localhost:3003");
});
