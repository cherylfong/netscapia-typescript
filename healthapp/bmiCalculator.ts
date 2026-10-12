import { argumentSanitation } from "./utils.ts";

const calculateBmi = (height: number, weight: number) => {
  // convert height in cm to m
  const heightInMeters = height / 100;

  const bmi = weight / Math.pow(heightInMeters, 2);

  if (bmi <= 18.5) {
    return "Underweight range";
  } else if (bmi > 18.5 && bmi <= 25) {
    return "Normal range";
  } else if (bmi > 25 && bmi <= 30) {
    return "Overweight range";
  } else if (bmi > 30 && bmi <= 35) {
    return "Moderately obese range";
  } else if (bmi > 35 && bmi <= 40) {
    return "Severely obese range";
  } else {
    return "Very severely obese range";
  }
};

// console.log(calculateBmi(180, 74));

// code block does not run if module is exported (used as an imported file in another file)
if (process.argv[1] === import.meta.filename) {
  try {
    const { option, numbers } = argumentSanitation(process.argv);
    console.log(
      `calculateBmi: height of ${option} with weight of ${numbers[0]} has the BMI of: ${calculateBmi(option, numbers[0])}`,
    );
  } catch (error: unknown) {
    let errorMessage = "calculateBmi ERROR: ";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
