import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT_DETAILS";
    payload: Patient;
    }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
    }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    patientId: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAILS":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (diagnosesObj, diagnosis) => ({ ...diagnosesObj, [diagnosis.code]: diagnosis }),
            {}
          )
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: [
            ...state.patient.entries,
            action.payload
          ]
        }
        
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

export const setPatientDetails = (patientDetailsFromApi: Patient): Action => {
  return { type: "SET_PATIENT_DETAILS", payload: patientDetailsFromApi};
};

export const addPatient = (newPatientFromApi: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatientFromApi };
};

export const setDiagnoses = (diagnosesFromApi: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES", payload: diagnosesFromApi };
};

export const addEntry = (patientId: string, newEntry: Entry): Action => {
  return { type: 'ADD_ENTRY', payload: newEntry, patientId };
};