const bmi = (height_m: number, weight_kg: number) =>
  weight_kg / Math.pow(height_m, 2);

const calculateBmi = (height_cm: number, weight_kg: number) => {
  const result = bmi(height_cm / 100, weight_kg);
  if (result >= 30.0) return "Obese";
  if (result >= 25.0) return "Overweight";
  if (result >= 18.0) return "Normal weight";
  return "Underweight";
};

console.log(calculateBmi(180, 74));
