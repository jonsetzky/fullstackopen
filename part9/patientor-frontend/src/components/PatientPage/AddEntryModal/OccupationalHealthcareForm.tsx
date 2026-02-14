import { InputLabel, TextField } from "@mui/material";
import { EntryBase, OccupationalHealthcareEntry } from "../../../types";
import { useEffect, useState } from "react";

export type OccupationalHealthcareFormValues = Omit<
  OccupationalHealthcareEntry,
  keyof EntryBase | "type"
>;

interface Props {
  onChange: (value: OccupationalHealthcareFormValues) => void;
}

export const OccupationalHealthcareForm = ({ onChange }: Props) => {
  const [employer, setEmployer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    onChange({
      employerName: employer,
      sickLeave: {
        endDate,
        startDate,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employer, startDate, endDate]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "2em" }} />
      <div style={{ width: "100%" }}>
        <TextField
          label="Employer"
          value={employer}
          onChange={({ target }) => {
            setEmployer(target.value);
          }}
        />
        <InputLabel>Sick Leave</InputLabel>
        <div style={{ display: "flex" }}>
          <TextField
            label="Start date"
            placeholder="YYYY-MM-DD"
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
          />
          <TextField
            label="End date"
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
          />
        </div>
      </div>
    </div>
  );
};
