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

const calculateExercise = (exerciseHours: Array<number>, target: number): exerciseResults => {
    const periodLength = exerciseHours.length
    const trainingDays = exerciseHours.filter((day) => day > 0).length
    const average = exerciseHours.reduce((a, b) => a + b)/periodLength
    const success = average > target

    const { rating, ratingDescription } = calculateRating(average, target)

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        target: target,
        average: average,
        rating: rating,
        ratingDescription: ratingDescription
    }
};

const calculateRating = (average: number, target: number): exerciseRating => {
    const exerciseRatio = average/target
    if (exerciseRatio < 0.75) {
        return { rating: 1, ratingDescription: "Keep up the hard work!"}
    } else if (0.75 <= exerciseRatio && exerciseRatio < 1.25) {
        return { rating: 2, ratingDescription: "You're doing great!"}
    } else if (1.25 <= exerciseRatio) {
        return { rating: 3, ratingDescription: "You're exceeding your own expectations, amazing!"}
    } else {
        return { rating: 0, ratingDescription: "N/A"}
    }
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))