import express from "express";
import { calculatorImproved, type Operation } from "./multiplier.ts";

const app = express();
app.use(express.json());

app.get("//", (_req, res) => {
  res.send("This is TypeScript Chapter 3 Example App.");
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (isNaN(Number(value1)) && isNaN(Number(value2))) {
    return res
      .status(400)
      .send({ error: "first and second values are not numbers" });
  }

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "first value given is not a number" });
  }

  if (!value2 || isNaN(Number(value2))) {
    return res
      .status(400)
      .send({ error: "second value given is not a number" });
  }

  const result = calculatorImproved(
    Number(value1),
    Number(value2),
    op as Operation,
  );
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
