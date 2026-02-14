import { EntryDetailsValues, EntryType } from "../../../types";
import { HospitalEntryForm } from "./HospitalEntryForm";
import { OccupationalHealthcareForm } from "./OccupationalHealthcareForm";
interface Props {
  type?: EntryType;
  onCancel: () => void;
  onChange: (values: EntryDetailsValues) => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const EntryDetailsForm = ({ onChange, type, setError }: Props) => {
  switch (type) {
    case "Hospital":
      return (
        <HospitalEntryForm
          setError={setError}
          onChange={(val) => onChange({ ...val, type: EntryType.Hospital })}
        />
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareForm
          setError={setError}
          onChange={(val) => onChange({ ...val, type: EntryType.Occupational })}
        />
      );
    default:
      return <div>please select a type</div>;
  }
};
