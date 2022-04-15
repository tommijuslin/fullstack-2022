import axios from "axios";
import React from "react";
import { Button } from "@material-ui/core";

import { useParams } from "react-router-dom";

import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { SvgIcon } from "@material-ui/core";

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  const patient = typeof id === "string" ? patients[id] : undefined;

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (typeof id === "string") {
          const { data: updatedPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(updatedPatient));
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (Object.keys(diagnoses).length === 0 || (patient && !patient.entries)) {
    return <h2>Loading...</h2>;
  }

  if (!patient) {
    return <h2>No patient found</h2>;
  }

  const icon = patient.gender === "male" ? MaleIcon : FemaleIcon;

  return (
    <div>
      <div>
        <h2>
          {patient.name}
          <SvgIcon component={icon}></SvgIcon>
        </h2>
      </div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h2>entries</h2>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
