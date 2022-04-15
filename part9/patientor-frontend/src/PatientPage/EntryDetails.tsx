import {
  Entry,
  HealthCheckEntryProps,
  HospitalEntryProps,
  OccupationalEntryProps,
} from "../types";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

import HealthRatingBar from "../components/HealthRatingBar";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const entryStyle = {
  border: "1px solid",
  borderRadius: "5px",
  padding: "5px",
  marginBottom: "10px",
};

interface BaseEntryProps {
  entry: Entry;
  icon: JSX.Element;
}

const BaseEntry = ({ entry, icon }: BaseEntryProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} {icon}
      </div>
      <div style={{ fontStyle: "italic" }}>{entry.description}</div>
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

export const HospitalEntry = ({ entry }: { entry: HospitalEntryProps }) => {
  return <BaseEntry entry={entry} icon={<LocalHospitalIcon />} />;
};

export const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalEntryProps;
}) => {
  return <BaseEntry entry={entry} icon={<WorkIcon />} />;
};

export const HealthCheckEntry = ({
  entry,
}: {
  entry: HealthCheckEntryProps;
}) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <BloodtypeIcon />
      </div>
      <div style={{ fontStyle: "italic" }}>{entry.description}</div>
      <HealthRatingBar
        showText={false}
        rating={entry.healthCheckRating}
        max={3}
      />
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
