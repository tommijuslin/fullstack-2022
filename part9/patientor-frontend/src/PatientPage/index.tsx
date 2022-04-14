import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientPage = () => {
  const [, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: updatedPatient } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(updatedPatient));
        setPatient(updatedPatient);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, []);

  if (!patient) {
    return <h2>No patient found.</h2>;
  }

  return (
    <div>
      <div>
        <h2>
          {patient.name}, {patient.gender}
        </h2>
      </div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;
