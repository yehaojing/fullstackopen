import { NewPatient, Gender, Entry, Diagnose, BaseEntry, HealthCheckRating } from "./types";
import { v4 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseGenericStringField(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseGenericStringField(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseGenericStringField(object.occupation),
    entries: parseArray(object.entries)
  };

  return newEntry;
};

export const toNewEntry = (object: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseGenericStringField(object.description),
    date: parseDate(object.date),
    specialist: parseGenericStringField(object.specialist),
    diagnosisCodes: parseDiagnosisArray(object.diagnosisCodes)
  };

  if (!object.type || !isString(object.type)) {
    throw new Error(`Missing or invalid entry type`);
  }

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthcheckRating(object.healthCheckRating)
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseGenericStringField(object.discharge.criteria)
        }
      };

    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
        sickLeave = {
          startDate: parseDate(object.sickLeaveStartDate),
          endDate: parseDate(object.sickLeaveEndDate)
        };
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseGenericStringField(object.employerName),
        sickLeave
      };

    default:
      throw new Error(`Incorrect entry type`);
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isArray = (array: unknown): array is Entry[] => {
  return array instanceof Array;
};

const isDiagnosisArray = (array: unknown): array is Array<Diagnose['code']> => {
  return array instanceof Array;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseGenericStringField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error("Invalid type");
  }
  return field;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseArray = (array: unknown): Entry[] => {
  if (!array || !isArray(array)) {
    throw new Error("Incorrect or missing entries: " + array);
  }
  return array;
};

const parseDiagnosisArray = (array: unknown): Array<Diagnose['code']> => {
  if (!array || !isDiagnosisArray(array)) {
    throw new Error("Incorrect or missing diagnosis: " + array);
  }
  return array;
};

const parseHealthcheckRating = (rating: any): HealthCheckRating => {
  const ratingNumber: number = parseInt(rating);
  if (isNaN(ratingNumber) || !isHealthCheckRating(ratingNumber) || !rating) {
    throw new Error("Incorrect or missing rating");
  }
  return ratingNumber;
};

