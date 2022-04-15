import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import EntryDetails from "./EntryDetails";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { SvgIcon } from "@material-ui/core";

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();

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

  if (!patient) {
    return <h2>No patient found</h2>;
  }

  const icon = patient.gender === "male" ? MaleIcon : FemaleIcon;

  if (Object.keys(diagnoses).length === 0 || !patient.entries) {
    return <h2>Loading...</h2>;
  }

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
    </div>
  );
};

export default PatientPage;
