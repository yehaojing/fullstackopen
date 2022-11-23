import { v4 as uuid } from 'uuid';
import patientsData from '../data/patients';

import { SensitivePatient, NewPatient, Patient } from '../types';

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<SensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (
  entry: NewPatient
): Patient => {

  const newPatient: Patient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

const getPatient = (
  findId: string
): Patient => {
  return patients.find(({id}) => id === findId) as Patient;
};

export default {
  getEntries,
  addPatient,
  getPatient
};