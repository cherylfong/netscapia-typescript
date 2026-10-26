import patientEntries from "../../data/patientEntries.ts";
import type { PatientEntry, NonSensitivePatientEntry } from "../types.ts";

const patients = patientEntries;

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, latin }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      latin,
    }),
  );
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  findById,
};
