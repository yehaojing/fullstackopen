import React from "react";
import { useStateValue } from "../state";
import { setPatientDetails } from "../state";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { useParams } from "react-router-dom";

const PatientDetails = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatientDetails(patientDetails));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      void fetchPatientDetails();
    }
  }, [patient, id, dispatch]);

  const resolvePatientGenderIcon = () => {
    if (patient?.gender === "male") {
      return <MaleIcon/>;
    } else if (patient?.gender === "female") {
      return <FemaleIcon/>;
    } else if (patient?.gender === "other") {
      return <TransgenderIcon/>;
    } else return null;
  };

  return (
    <>
      <h2>{patient?.name} {resolvePatientGenderIcon()}</h2>
      <div>
        <p>
          SSN: {patient?.ssn}
        </p>
        <p>
          Occupation: {patient?.occupation}
        </p>
      </div>
    </>
  );
};

export default PatientDetails;
