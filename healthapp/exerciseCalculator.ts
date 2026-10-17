import { argumentSanitation } from "./utils.ts";

type Rating = 1 | 2 | 3;

export interface Result {
  periodLength: number; // number of hours given
  trainingDays: number; // number of non-zero hours given
  success: boolean; // true if target === average
  rating: Rating; // 1 is bad, 2 is good, 3 is excellent
  ratingDescription: string; // text explaining a rating
  target: number; // the targeted average number of hours exercised
  average: number; // average hours in the given days
}

// calculates the average time of daily exercise hours and compares average with target amount
// parameter is array of hours
// returns Result object
export const calculateExercises = (target: number, hours: number[]): Result => {
  //   const target: number = 2;
  const average: number = hours.reduce((a, b) => a + b) / hours.length;

  // rating is a measure of how close the average is to the target
  // Under 25% is rating 1
  // More than 97% is rating 3
  // Otherwise rating is 2
  const difference = target - average;
  let rate: Rating;

  // outlier: if average is greater than target
  if (difference < 0) {
    rate = 3;
  } else {
    const score = 1 - difference / target;

    if (score > 0.97) {
      rate = 3;
    } else if (score < 0.25) {
      rate = 1;
    } else {
      rate = 2;
    }
  }

  let rateDes = "";

  switch (rate) {
    case 1:
      rateDes = "put in more effort";
      break;
    case 2:
      rateDes = "not too bad but could be better";
      break;
    case 3:
      rateDes = "you reached your target!";
      break;
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h !== 0).length,
    success: target === average ? true : false,
    rating: rate,
    ratingDescription: rateDes,
    target: target,
    average: average,
  };
};

// const test = [3, 0, 2, 4.5, 0, 3, 1];
// console.log(calculateExercises(test));

// only run this block if initiated from the commandline
if (process.argv[1] === import.meta.filename) {
  try {
    const { option, numbers } = argumentSanitation(process.argv);

    console.log(
      `calculateExercises: target of ${option} with the hours of ${numbers} has the following result: `,
    );

    console.log(calculateExercises(option, numbers));
  } catch (error: unknown) {
    let errorMessage = "calculateExercises ERROR: ";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
