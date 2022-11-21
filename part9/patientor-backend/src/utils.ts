import { NewPatient, Gender, Entry } from "./types";

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
