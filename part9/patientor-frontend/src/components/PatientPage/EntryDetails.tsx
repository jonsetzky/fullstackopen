import { Entry } from "../../types";
import { OccupationalHealthcareDetails } from "./OccupationalHealthcareDetails";
import { HospitalDetails } from "./HospitalDetails";

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "Hospital":
      return <HospitalDetails entry={entry} />;
  }
};
