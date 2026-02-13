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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
