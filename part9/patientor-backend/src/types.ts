export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type SensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface sickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string;
  sickLeave?: sickLeave
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = Omit<Entry, "id">; 