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

const parseArgumentsExercise = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  args = args.slice(2);

  if (args.every((value) => !isNaN(Number(value)))) {
    return args.map((arg) => Number(arg));
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const ratingCalculator = (target: number, average: number): ratingInfo => {
  const deficit = Math.abs(target - average);

  if (deficit === 0) {
    return {
      rating: 3,
      ratingDescription: 'Great job, keep it up!',
    };
  } else if (deficit <= 0.5) {
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
  target: number,
  days: Array<number>
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

try {
  const hoursPerDay = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(hoursPerDay[0], hoursPerDay.slice(1)));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
