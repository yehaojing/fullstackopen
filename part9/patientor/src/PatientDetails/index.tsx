import React from "react";
import { addEntry, useStateValue } from "../state";
import { setPatientDetails } from "../state";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient, Entry } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { useParams } from "react-router-dom";
import { EntryDetails } from "../components/EntryDetails";
import { AddEntryModal } from "../AddPatientModal";
import { Button } from "@material-ui/core";
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";

const PatientDetails = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${values.id}/entries`,
        values
      );
      dispatch(addEntry(values.id, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
        <h3>
          Entries
        </h3>
        <p>
          {patient?.entries.map((entry, idx) => {
            return (
              <>
                <EntryDetails entry={entry} key={idx}/>
              </>
            );
          })}
        </p>
        {id ?
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            patientId={id}
          /> :
          <></>
        }
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
      </Button>
      </div>
    </>
  );
};

export default PatientDetails;
