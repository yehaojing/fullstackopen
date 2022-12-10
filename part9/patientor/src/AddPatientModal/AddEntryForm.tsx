import React from "react";
import { useStateValue } from "../state";
import { Grid, Button, Divider } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, HealthCheckOption, SelectField, TextField } from "./FormField";
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../types";

export type EntryFormValues = Entry;
export type HospitalEntryFormValues = HospitalEntry;
export type HealthCheckEntryFormValues = HealthCheckEntry;
export type OccupationalHealthCareEntryFormValues = OccupationalHealthcareEntry;

interface EntryProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  patientId: string;
}

interface HospitalEntryProps {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
  patientId: string;
}

interface HealthCheckEntryProps {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
  patientId: string;
}

interface OccupationalHealthCareEntryProps {
  onSubmit: (values: OccupationalHealthCareEntryFormValues) => void;
  onCancel: () => void;
  patientId: string;
}

const ratingOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

export const AddEntryForm = ({ onSubmit, onCancel, patientId }: EntryProps) => {
  const [entryType, setEntryType] = React.useState("");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newEntryType: string
  ) => {
    if (newEntryType !== null) {
      setEntryType(newEntryType);
    }

  };
  return (
    <>
      <ToggleButtonGroup value={entryType} exclusive onChange={handleChange}>
        <ToggleButton value="Hospital">Hospital</ToggleButton>
        <ToggleButton value="HealthCheck">Healh Check</ToggleButton>
        <ToggleButton value="OccupationalHealthcare">Occupational Healthcare</ToggleButton>
      </ToggleButtonGroup>
      <Divider style={{ margin: 5 }}></Divider>
      {entryType === "Hospital" &&
      <HospitalEntryForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        patientId={patientId}
      />}
      {entryType === "HealthCheck" && <HealthCheckForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        patientId={patientId}
      />}
      {entryType === "OccupationalHealthcare" && <OccupationalHealthCareEntryForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        patientId={patientId}
      />}
    </>
  );
};

const HospitalEntryForm = ({ onSubmit, onCancel, patientId }: HospitalEntryProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: patientId,
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: "",
        },
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateError = "Date is incorrectly formatted";
        const errors: { [field: string]: any } = { };
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.date = dateError;
        }
        if (!Date.parse(values.discharge.date)) {
          errors.discharge = { date: dateError };
        }
        if (!values.discharge.criteria) {
          errors.discharge = { criteria: requiredError };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={TextField}
            />
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

const HealthCheckForm = ({ onSubmit, onCancel, patientId }: HealthCheckEntryProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: patientId,
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0,
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateError = "Date is incorrectly formatted";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.date = dateError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Health Check Rating"
              name="healthCheckRating"
              options={ratingOptions}
            />
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

const OccupationalHealthCareEntryForm = ({ onSubmit, onCancel, patientId }: OccupationalHealthCareEntryProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: patientId,
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateError = "Date is incorrectly formatted";
        const errors: { [field: string]: any } = { };
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.date = dateError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave && !Date.parse(values.sickLeave.startDate)) {
          errors.sickLeave = { startDate: dateError };
        }
        if (values.sickLeave && !Date.parse(values.sickLeave.endDate)) {
          errors.sickLeave = { endDate: dateError };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
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
