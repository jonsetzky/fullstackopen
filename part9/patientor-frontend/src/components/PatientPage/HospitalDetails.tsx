import { HospitalEntry } from "../../types";

export const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <h4>hospital</h4>
      discharged {entry.discharge.date}: {entry.discharge.criteria}
    </div>
  );
};
