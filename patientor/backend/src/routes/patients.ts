import express, { type Response, type Request } from "express";
import patientsService from "../services/patientsService.ts";
import { type NonSensitivePatientEntry, type NewPatientEntry, type PatientEntry } from "../types.ts";

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

router.post('/', (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry> ) => {
  const newPatient : PatientEntry = patientsService.addPatient(req.body);
  res.json(newPatient);
});


export default router;
