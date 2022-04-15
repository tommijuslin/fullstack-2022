import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  DiagnosisSelection,
  TypeOption,
  SelectField,
  HealthCheckRatingOption,
} from "../AddPatientModal/FormField";
import { Type, Diagnosis, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

// UnionOmit refuses to work for me

export interface EntryFormValues {
  type: Type;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  description?: string;
  healthCheckRating: HealthCheckRating;
  discharge: { date: string; criteria: string };
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.HealthCheck, label: "Health Check" },
  { value: Type.OccupationalHealthcare, label: "Occupational Healthcare" },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const TypeSwitch = (type: string) => {
  switch (type) {
    case Type.Hospital:
      return (
        <div>
          <Field
            label="Discharge"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </div>
      );
    case Type.OccupationalHealthcare:
      return (
        <div>
          <Field
            label="Employer"
            placeholder="Employer"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="Sick Leave Start Date"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Day"
            placeholder="Sick Leave End Day"
            name="sickLeave.endDate"
            component={TextField}
          />
        </div>
      );
    case Type.HealthCheck:
      return (
        <div>
          <SelectField
            label="Health Check Rating"
            name="healthCheckRating"
            options={healthCheckRatingOptions}
          />
        </div>
      );
    default:
      return null;
  }
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: Type.Hospital,
        date: "2000-01-01",
        specialist: "Tommi Juslin",
        diagnosisCodes: [],
        description: "Mee töihin",
        healthCheckRating: HealthCheckRating.Healthy,
        discharge: {
          date: "2000-01-01",
          criteria: "Meni töihin",
        },
        employerName: "Jommi Tuslin",
        sickLeave: {
          startDate: "2000-01-01",
          endDate: "2000-01-01",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.type === Type.Hospital) {
          if (!values.discharge.date) {
            errors.discharge = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.discharge = requiredError;
          }
        }
        if (values.type === Type.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {TypeSwitch(values.type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
