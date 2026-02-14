import { InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { EntryBase, HospitalEntry } from "../../../types";

export type HospitalEntryValues = Omit<HospitalEntry, keyof EntryBase | "type">;

interface Props {
  onChange: (value: HospitalEntryValues) => void;
}

export const HospitalEntryForm = ({ onChange }: Props) => {
  const [date, setDate] = useState("");
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    onChange({
      discharge: {
        criteria,
        date,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria, date]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "2em" }} />
      <div style={{ width: "100%" }}>
        <InputLabel>Discharge</InputLabel>
        <div style={{ display: "flex" }}>
          <TextField
            label="Date"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Criteria"
            fullWidth
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        </div>
      </div>
    </div>
  );
};
