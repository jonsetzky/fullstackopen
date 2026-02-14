import { useState, SyntheticEvent, useMemo } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import {
  Diagnosis,
  EntryDetailsValues,
  EntryFormValues,
  EntryType,
} from "../../../types";
import { EntryDetailsForm } from "./EntryDetailsForm";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses?: Diagnosis[];
}

interface DiagnosisOption {
  value: string;
  label: string;
}
const diagnosisOption = (d: Diagnosis): DiagnosisOption => ({
  value: d.code,
  label: `${d.code}: ${d.name}`,
});

const EntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>(EntryType.Hospital);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<DiagnosisOption[]>([]);

  const [details, setDetails] = useState<EntryDetailsValues>();

  const allowedDiagnoses = useMemo<DiagnosisOption[]>(
    () => diagnoses?.map(diagnosisOption) || [],
    [diagnoses],
  );

  const diagnosisOptionFromCode = (
    code: string,
  ): DiagnosisOption | undefined => {
    const diagnosis = diagnoses?.find((d) => d.code === code);
    if (!diagnosis) return;
    return diagnosisOption(diagnosis);
  };

  const onDiagnosesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();

    if (typeof event.target.value === "string") {
      return;
    }

    setDiagnosisCodes(
      event.target.value
        .map(diagnosisOptionFromCode)
        .filter((d) => d !== undefined),
    );
  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;

      const type = Object.values(EntryType).find(
        (t) => t.toString().toLowerCase() === value.toLowerCase(),
      );
      if (type) {
        setType(type);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      description,
      diagnosisCodes: diagnosisCodes.map((d) => d.value),
      specialist,
      type,
      ...details,
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>General</InputLabel>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnoses</InputLabel>
        <Select<string[]>
          multiple
          fullWidth
          value={diagnosisCodes.map((d) => d.value)}
          renderValue={(selected) => selected.join(", ")}
          onChange={onDiagnosesChange}
        >
          {allowedDiagnoses
            .sort((a, b) => a.value.localeCompare(b.value))
            .map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Healthcare</InputLabel>
        <Select label="Type" fullWidth value={type} onChange={onTypeChange}>
          {Object.values(EntryType).map((option) => (
            <MenuItem key={option.toString()} value={option.toString()}>
              {option.toString()}
            </MenuItem>
          ))}
        </Select>
        <div style={{ height: "0.5em" }}></div>
        <EntryDetailsForm
          type={type}
          onCancel={() => {
            setDetails(undefined);
          }}
          onChange={(v) => {
            setDetails(v);
          }}
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
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EntryForm;
