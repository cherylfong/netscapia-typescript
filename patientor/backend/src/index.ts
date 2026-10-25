import express from "express";
import diagnosesRouter from "./routes/diagnoses.ts";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  console.log("placeholder for /api/patients");
  res.send("needs implementation");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
