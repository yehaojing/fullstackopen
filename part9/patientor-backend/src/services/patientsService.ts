import patientsData from '../data/patients.json';

import { SensitivePatient } from '../types';

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

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient
};