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
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export const healthCheckRatingLabels: Record<HealthCheckRating, string> = {
  [HealthCheckRating.Healthy]: "healthy",
  [HealthCheckRating.LowRisk]: "low risk",
  [HealthCheckRating.HighRisk]: "high risk",
  [HealthCheckRating.CriticalRisk]: "critical risk",
};

export interface Entry {
  date: string;
  description: string;
  specialist: string;
  type: string;
  employerName?: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  healthCheckRating?: HealthCheckRating;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
