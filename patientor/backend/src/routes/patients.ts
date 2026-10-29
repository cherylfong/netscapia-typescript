import express, { type Response, type Request } from "express";
import patientsService from "../services/patientsService.ts";
import {
  type NonSensitivePatientEntry,
  type NewPatientEntry,
  type PatientEntry,
} from "../types.ts";
import parseNewPatientAddition from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientsService.getNonSensitivePatientEntries();
  res.send(data);
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  (req: Request<unknown, unknown, unknown>, res, next) => {
    const body = req.body;

    const isEmpty =
      body === undefined ||
      body === null ||
      (typeof body === "object" &&
        !Array.isArray(body) &&
        Object.keys(body).length === 0);

    if (isEmpty) {
      res.status(400).send(
        "Request body empty, this endpoint is to add a new patient",
      );
      return;
    }

    next("route"); // use the next router.post function
  },
);

router.post(
  "/",
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry | string>,
  ) => {
    try {
      const parsedData = parseNewPatientAddition(req.body);

      const newPatient: PatientEntry = patientsService.addPatient(parsedData);

      res.json(newPatient);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";

      res.status(400).send(errorMessage);
    }
  },
);

export default router;
