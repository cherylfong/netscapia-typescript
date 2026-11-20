import express from "express";
import diagnosesService from "../services/diagnosesService.ts";

const router = express.Router();

router.get("/", (req, res) => {
  const code = req.query.code;

  if (code === undefined) {
    res.send(diagnosesService.getDiagnoses());
    return;
  }

  if (typeof code !== "string") {
    res.status(400).send("code must be a string");
    return;
  }

  const diagnosis = diagnosesService.findByCode(code);

  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
});

router.get("/:id", (req, res) => {
  const diagnosis = diagnosesService.findById(Number(req.params.id));

  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
});

export default router;
