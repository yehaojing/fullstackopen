import { v4 as uuid } from 'uuid';
import patientsData from '../data/patients.json';

import { SensitivePatient, NewPatient, Patient } from '../types';

const patients: Array<SensitivePatient> = patientsData as Array<SensitivePatient>;

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

export default {
  getEntries,
  addPatient
};