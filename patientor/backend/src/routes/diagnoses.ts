import express, { type Response } from "express";
import diagnosesService from "../services/diagnosesService.ts";
import { type DiagnosesEntry } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnosesEntry[]>) => {
  const data = diagnosesService.getDiagnoses();
  res.send(data);
});

router.get("/:id", (req, res) => {
  const diagnoses = diagnosesService.findById(Number(req.params.id));

  if (diagnoses) {
    res.send(diagnoses);
  } else {
    res.sendStatus(404);
  }
});

export default router;
