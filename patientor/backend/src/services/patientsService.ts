import patientFullEntries from "../../data/patientFullEntries.ts";
import type {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientLogEntryType,
  NewPatientLogEntry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const patients = patientFullEntries;

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }),
  );
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatient: PatientEntry = {
    ...patient,
    id: uuid(),
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientLogEntries = (id: string): PatientLogEntryType[] => {
  const patient = findById(id);

  return patient?.entries ?? [];
};

const addPatientLogEntry = (
  entry: NewPatientLogEntry,
  patientId: string,
): PatientLogEntryType => {
  const newEntry: PatientLogEntryType = {
    ...entry,
    id: uuid(),
  };
  const patientLogEntries = getPatientLogEntries(patientId);
  patientLogEntries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  findById,
  addPatient,
  addPatientLogEntry,
};
