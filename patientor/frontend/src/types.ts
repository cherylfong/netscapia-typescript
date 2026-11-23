import type { Dayjs } from "dayjs";

export interface Diagnosis {
  id: number;
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

export enum EntryTypeLiterals {
  Hospital = "Hospital",
  OccupationalHealthcare = "Occupational Healthcare",
  HealthCheck = "Health Check",
}

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

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
  type: EntryType;
  employerName?: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  healthCheckRating?: HealthCheckRating;
  discharge?: {
    date: string;
    criteria: string;
  };
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export interface BaseFormInputProps {
  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;

  specialist: string;
  setSpecialist: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  codeDiagnose: string[];
  setCodeDiagnose: (value: string[]) => void;
}

export interface HealthCheckFormInputProps extends BaseFormInputProps {
  healthCheckRating: HealthCheckRating | undefined;
  setHealthCheckRating: (value: HealthCheckRating | undefined) => void;
}

export interface HospitalFormInputProps extends BaseFormInputProps {
  dummy: string;
}

export interface OccupationalHealthCareInputProp extends BaseFormInputProps {
  dummy: string;
}
