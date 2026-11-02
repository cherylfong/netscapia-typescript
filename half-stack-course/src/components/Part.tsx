// Exercise 18 description
// A component named Part that renders all attributes of each type of course part.
// Use a switch case-based exhaustive type checking!
import { type ContentProp } from "../types";

export const Part = ({ courseParts }: ContentProp) => {
  return (
    <>
      {courseParts.map((part, idx) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={idx}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>{part.description}</p>
              </div>
            );
          case "group":
            return (
              <div key={idx}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>project exercise {part.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div key={idx}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>material {part.backgroundMaterial}</p>
              </div>
            );
          case "special":
            return (
              <div key={idx}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>requirements:</p>
                <ul>
                  {part.requirements.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
              </div>
            );
        }
      })}
    </>
  );
};
