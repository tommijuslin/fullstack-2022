import { Gender, NewPatient, NewEntry, Type, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (item: unknown, label: string): string => {
  if (!item || !isString(item)) {
    throw new Error(`Incorrect or missing ${label}`);
  }

  return item;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, "name"),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, "ssn"),
    gender: parseGender(gender),
    occupation: parseString(occupation, "occupation"),
    entries: []
  };

  return newPatient;
};

type EntryFields = {
  date: unknown;
  type: unknown;
  specialist: unknown;
  description: unknown;
  discharge: {
    date: unknown;
    criteria: string;
  };
  employerName: unknown;
  healthCheckRating: number;
};

export const toNewEntry = ({
  date,
  type,
  specialist,
  description,
  discharge,
  employerName,
  healthCheckRating
}: EntryFields): NewEntry => {
  let newEntry: NewEntry;
  switch (type) {
    case Type.Hospital:
      newEntry = {
        type: Type.Hospital,
        description: parseString(description, "description"),
        date: parseDate(date),
        specialist: parseString(specialist, "specialist"),
        discharge: {
          date: parseDate(date),
          criteria: parseString(discharge.criteria, "criteria")
        }
      };
      break;
    case Type.OccupationalHealthcare:
      newEntry = {
        type: Type.OccupationalHealthcare,
        description: parseString(description, "description"),
        date: parseDate(date),
        specialist: parseString(specialist, "specialist"),
        employerName: parseString(employerName, "employerName")
      };
      break;
    case Type.HealthCheck:
      newEntry = {
        type: Type.HealthCheck,
        description: parseString(description, "description"),
        date: parseDate(date),
        specialist: parseString(specialist, "specialist"),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      break;
    default:
      throw new Error("malformatted parameters");
  }

  return newEntry;
};
