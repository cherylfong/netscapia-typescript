import { z } from "zod";

export const NewDiagnosesSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type NewDiagnosesEntry = z.infer<typeof NewDiagnosesSchema>;

export interface DiagnosesEntry extends NewDiagnosesEntry {
  id: number;
}

export const PatientLogEntrySchema = z.object({
  date: z.iso.date(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(NewDiagnosesSchema.shape.code).optional(),
});

export type PatientLogEntry = z.infer<typeof PatientLogEntrySchema>;

const PatientLogLiteralType = {
  HealthCheck: "HealthCheck",
  Hospital: "Hospital",
  OccupationalHealthcare: "OccupationalHealthcare",
} as const;

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

const HealthCheckEntryPatientLogSchema = z.object({
  type: z.literal(PatientLogLiteralType.HealthCheck),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

const HospitalEntryPatientLogSchema = z.object({
  type: z.literal(PatientLogLiteralType.Hospital),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcarePatientLogSchema = z.object({
  type: z.literal(PatientLogLiteralType.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export const PatientLogTypeSchema = z.discriminatedUnion("type", [
  PatientLogEntrySchema.extend(HealthCheckEntryPatientLogSchema.shape),
  PatientLogEntrySchema.extend(HospitalEntryPatientLogSchema.shape),
  PatientLogEntrySchema.extend(OccupationalHealthcarePatientLogSchema.shape),
]);

const PatientLogTypeSchemaWithId = z.intersection(
  PatientLogTypeSchema,
  z.object({ id: z.string() }),
);

export type NewPatientLogEntry = z.infer<typeof PatientLogTypeSchema>;

export type PatientLogEntryType = NewPatientLogEntry & { id: string };

export const Gender = {
  Female: "female",
  Male: "male",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(PatientLogTypeSchemaWithId).optional(),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type PatientEntry = NewPatientEntry & { id: string };

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
