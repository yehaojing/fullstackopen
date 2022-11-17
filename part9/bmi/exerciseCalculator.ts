interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseRating {
  rating: number;
  ratingDescription: string;
}

export const calculateExercise = (
  exerciseHours: Array<number>,
  target: number
): exerciseResults => {
  if (!target) throw new Error("No target provided");

  if (exerciseHours.length < 1 || !exerciseHours)
    throw new Error("No days provided");

  if (target < 0 || exerciseHours.some((hour) => hour < 0))
    throw new Error("Negative value(s) provided");

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((day) => day > 0).length;
  const average = exerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average > target;

  const { rating, ratingDescription } = calculateRating(average, target);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    target: target,
    average: average,
    rating: rating,
    ratingDescription: ratingDescription,
  };
};

const calculateRating = (average: number, target: number): exerciseRating => {
  const exerciseRatio = average / target;
  if (exerciseRatio < 0.75) {
    return { rating: 1, ratingDescription: "Keep up the hard work!" };
  } else if (0.75 <= exerciseRatio && exerciseRatio < 1.25) {
    return { rating: 2, ratingDescription: "You're doing great!" };
  } else if (1.25 <= exerciseRatio) {
    return {
      rating: 3,
      ratingDescription: "You're exceeding your own expectations, amazing!",
    };
  } else {
    return { rating: 0, ratingDescription: "N/A" };
  }
};

const target = Number(process.argv[2]);
const exerciseHours: Array<number> = process.argv
  .slice(3)
  .map((hour) => Number(hour));

try {
  console.log(calculateExercise(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
