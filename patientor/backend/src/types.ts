import { z } from "zod";

export const Gender = {
  Female: "female",
  Male: "male",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const NewPatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  latin: z.string().optional(),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type PatientEntry = NewPatientEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export const NewDiagnosesSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type NewDiagnosesEntry = z.infer<typeof NewDiagnosesSchema>;

export interface DiagnosesEntry extends NewDiagnosesEntry {
  id: number;
}
