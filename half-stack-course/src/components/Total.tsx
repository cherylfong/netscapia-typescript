import { type CoursePartsProp } from "../types";

export const Total = ({ courseParts }: CoursePartsProp) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return <p>Number of exercises {totalExercises}</p>;
};
