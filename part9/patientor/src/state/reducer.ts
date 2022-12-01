import { State } from "./state";
import { Patient, Diagnosis } from "../types";

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