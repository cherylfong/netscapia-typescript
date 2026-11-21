export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export enum HealthCheckRating {
  Healthy = "healthy",
  LowRisk = "lowRisk",
  HighRisk = "highRisk",
  CriticalRisk = "criticalRisk",
}

export interface Entry {
  date: string;
  description: string;
  specialist: string;
  type: string;
  employerName?: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  healthCheckRating?: HealthCheckRating;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
