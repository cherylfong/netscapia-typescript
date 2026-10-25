import diagnosesEntries from "../../data/diagnosesEntries.ts";
import type { DiagnosesEntry, NewDiagnosesEntry } from "../types.ts";

const diagnoses = diagnosesEntries;

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

const findById = (id: number): DiagnosesEntry | undefined => {  
  const entry = diagnoses.find(d => d.id === id);  
  return entry;
};

const addDiagnoses = (entry: NewDiagnosesEntry): DiagnosesEntry => {

    const newDiagnoses = {
        id: Math.max(... diagnoses.map(d => d.id)) + 1,
        ...entry
    };
    diagnoses.push(newDiagnoses);
    return newDiagnoses;
};

export default {
    getDiagnoses,
    addDiagnoses,
    findById,
};