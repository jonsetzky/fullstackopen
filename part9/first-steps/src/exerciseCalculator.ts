import process from "node:process";

const DESCRIPTIONS = [
  "could be better",
  "not too bad but could be better",
  "not too bad",
];

const calculateExercises = (dailyHours: number[], target: number) => {
  const success = dailyHours.find((hour) => hour < target) === undefined;
  const average =
    dailyHours.reduce((sum, curr) => sum + curr, 0) / dailyHours.length;
  const rating = success ? 3 : average > target / 2 ? 2 : 1;

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.reduce((prev, curr) => prev + Number(curr > 0), 0),
    success,
    rating,
    ratingDescription: DESCRIPTIONS[rating - 1],
    target,
    average,
  };
};

if (process.argv.length < 4) {
  console.log("please input at least two numbers");
  process.exit(1);
}

if (process.argv.slice(2).map(Number.parseFloat).find(isNaN) !== undefined) {
  console.log("please input only numbers");
  process.exit(1);
}

const target = Number(process.argv[2]);
let dailyHours: number[] = process.argv.slice(3).map(Number);

console.log(calculateExercises(dailyHours, target));
