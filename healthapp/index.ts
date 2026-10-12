import express, { type Express, type Request, type Response } from "express";
import calculateBmi from "./bmiCalculator.ts";

const app: Express = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
