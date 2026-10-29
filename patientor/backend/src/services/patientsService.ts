import patientEntries from "../../data/patientEntries.ts";
import type { PatientEntry, NewPatientEntry, NonSensitivePatientEntry } from "../types.ts";
import { v1 as uuid } from 'uuid';

const patients = patientEntries;

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = ( patient: NewPatientEntry ): PatientEntry => {

  const newPatient: PatientEntry = {
    ...patient,
    id: uuid(),
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  findById,
  addPatient
};
