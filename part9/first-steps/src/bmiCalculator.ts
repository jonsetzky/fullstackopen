import process from "node:process";

const bmi = (height_m: number, weight_kg: number) =>
  weight_kg / Math.pow(height_m, 2);

const calculateBmi = (height_cm: number, weight_kg: number) => {
  const result = bmi(height_cm / 100, weight_kg);
  if (result >= 30.0) return "Obese";
  if (result >= 25.0) return "Overweight";
  if (result >= 18.0) return "Normal weight";
  return "Underweight";
};

if (process.argv.length < 4) {
  console.log("please input: <height in cm> <weight in kg>");
  process.exit(1);
}

const height_cm = Number(process.argv[2]);
const weight_kg = Number(process.argv[3]);

if (isNaN(height_cm) || isNaN(weight_kg)) {
  console.log("please input: <height in cm> <weight in kg>");
  process.exit(1);
}

console.log(calculateBmi(height_cm, weight_kg));
