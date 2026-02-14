import { InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { EntryBase, HospitalEntry } from "../../../types";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export type HospitalEntryValues = Omit<HospitalEntry, keyof EntryBase | "type">;

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  onChange: (value: HospitalEntryValues) => void;
}

export const HospitalEntryForm = ({ onChange, setError }: Props) => {
  const [criteria, setCriteria] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (!date) {
      setError("end date must be set for discharge");
      return;
    } else {
      setError("");
    }
    onChange({
      discharge: {
        criteria,
        date: date.format("YYYY-MM-DD"),
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
          <DatePicker
            label="Date"
            value={date}
            onChange={(value) => setDate(value)}
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
