import { v1 as uuid } from "uuid";

import { NonSensitivePatient, Patient, NewPatient, NewEntry } from "../types";

import patientData from "../../data/patients";

const patients: Array<Patient> = patientData;

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Patient | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patient = patients.find((p) => p.id === patientId);

  patient?.entries.push(newEntry);

  return patient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};
