import { EntryDetailsValues, EntryType } from "../../../types";
import { HospitalEntryForm } from "./HospitalEntryForm";
import { OccupationalHealthcareForm } from "./OccupationalHealthcareForm";
interface Props {
  type?: EntryType;
  onCancel: () => void;
  onChange: (values: EntryDetailsValues) => void;
}

export const EntryDetailsForm = ({ onChange, type }: Props) => {
  switch (type) {
    case "Hospital":
      return (
        <HospitalEntryForm
          onChange={(val) => onChange({ ...val, type: EntryType.Hospital })}
        />
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareForm
          onChange={(val) => onChange({ ...val, type: EntryType.Occupational })}
        />
      );
    default:
      return <div>please select a type</div>;
  }
};
