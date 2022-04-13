interface exerciseHours {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  average: number;
  rating: number;
  ratingDescription: string;
}

interface ratingInfo {
  rating: number;
  ratingDescription: string;
}

const ratingCalculator = (target: number, average: number): ratingInfo => {
  const deficit = Math.abs(target - average);

  if (deficit === 0) {
    return {
      rating: 3,
      ratingDescription: 'Great job, keep it up!',
    };
  } else if (deficit <= 0.25) {
    return {
      rating: 2,
      ratingDescription:
        "You did well this week, but there's still room for improvement!",
    };
  } else {
    return {
      rating: 1,
      ratingDescription: "We all have bad weeks, don't let it get to you!",
    };
  }
};

const calculateExercises = (
  days: Array<number>,
  target: number
): exerciseHours => {
  const periodLength = days.length;
  const trainingDays = days.filter((hours) => hours !== 0).length;
  const success = trainingDays === target;
  const average = days.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const { rating, ratingDescription } = ratingCalculator(target, average);

  return {
    periodLength,
    trainingDays,
    success,
    target,
    average,
    rating,
    ratingDescription,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
