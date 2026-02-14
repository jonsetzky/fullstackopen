import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { Diagnosis, EntryFormValues, Gender } from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses?: Diagnosis[];
}

const ALLOWED_TYPES = ["Hospital", "OccupationalHealthcare"] as const;

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<(typeof ALLOWED_TYPES)[number] | "">("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;

      const type = ALLOWED_TYPES.find(
        (t) => t.toLowerCase() === value.toLowerCase(),
      );
      if (type) {
        setType(type);
      }
    }
  };
  Object.values(Gender);

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!type) {
      console.log("todo handle"); // todo handle
      return;
    }
    onSubmit({
      date,
      description,
      diagnosisCodes,
      specialist,
      type,
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <InputLabel>General</InputLabel>
        <TextField
          label="Date of birth"
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
        <TextField
          label="Diagnosis codes (comma separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(target.value.split(",").map((s) => s.trim()))
          }
        />

        <InputLabel style={{ marginTop: 20 }}>Healthcare</InputLabel>
        <Select label="Type" fullWidth value={type} onChange={onTypeChange}>
          {ALLOWED_TYPES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>

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

export default AddEntryForm;
