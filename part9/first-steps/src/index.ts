import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

app.listen(3003, () => {
  console.log("Server is running on http://localhost:3003");
});
