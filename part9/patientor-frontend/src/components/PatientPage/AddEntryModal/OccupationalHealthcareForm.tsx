import { InputLabel, TextField } from "@mui/material";
import { EntryBase, OccupationalHealthcareEntry } from "../../../types";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export type OccupationalHealthcareFormValues = Omit<
  OccupationalHealthcareEntry,
  keyof EntryBase | "type"
>;

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  onChange: (value: OccupationalHealthcareFormValues) => void;
}

export const OccupationalHealthcareForm = ({ onChange, setError }: Props) => {
  const [employer, setEmployer] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (!endDate) {
      setError("end date must be set for sick leave");
      return;
    } else if (!startDate) {
      setError("start date must be set for sick leave");
      return;
    } else {
      setError("");
    }

    onChange({
      employerName: employer,
      sickLeave: {
        endDate: endDate.format("YYYY-MM-DD"),
        startDate: startDate.format("YYYY-MM-DD"),
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
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(value) => setStartDate(value)}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(value) => setEndDate(value)}
          />
        </div>
      </div>
    </div>
  );
};
