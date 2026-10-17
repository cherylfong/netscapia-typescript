import express, { type Express, type Request, type Response } from "express";
import calculateBmi from "./bmiCalculator.ts";
import { calculateExercises, type Result } from "./exerciseCalculator.ts";

const app: Express = express();
app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  try {
    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
      const height: number = Number(req.query.height);
      const weight: number = Number(req.query.weight);

      const result: string = calculateBmi(height, weight);

      res.send({
        weight: weight,
        height: height,
        bmi: result,
      });
    } else {
      throw new Error("malformed parameters");
    }
  } catch (error: unknown) {
    let errorMessage = "bmi endpoint ERROR - ";
    if (error instanceof Error) {
      errorMessage += error.message;
      console.log(errorMessage);
      res.send({ error: errorMessage });
    }
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  try {
    const body: unknown = req.body;
    if (
      typeof body !== "object" ||
      body === null ||
      !("daily_exercises" in body) ||
      !("target" in body)
    ) {
      throw new Error("malformed parameters");
    }

    const { daily_exercises, target } = body;

    if (isNaN(Number(target))) {
      throw new Error("target is not a number!");
    }

    if (!Array.isArray(daily_exercises)) {
      throw new Error("daily_exercises must be an array!");
    }

    const exercises: unknown[] = daily_exercises;
    const allNumbers: boolean = exercises.every((e) => !isNaN(Number(e)));

    if (!allNumbers) {
      throw new Error("daily_exercises contains a non-number!");
    }

    const values: Result = calculateExercises(
      Number(target),
      exercises.slice(0).map((e) => Number(e)),
    );

    res.send({ values });
  } catch (error: unknown) {
    let errorMessage = "exercise endpoint ERROR - ";
    if (error instanceof Error) {
      errorMessage += error.message;
      console.log(errorMessage);
      res.send({ error: errorMessage });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
