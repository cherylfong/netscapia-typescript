import { type ContentProp } from "../types";

export const Total = ({ courseParts }: ContentProp) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return <h2>Number of exercises {totalExercises}</h2>;
};
