import { type CoursePartsProp } from "../types";

export const Content = ({ courseParts }: CoursePartsProp) => {
  return (
    <>
      {courseParts.map((p) => (
        <p>
          {" "}
          {p.name} {p.exerciseCount}{" "}
        </p>
      ))}
    </>
  );
};
