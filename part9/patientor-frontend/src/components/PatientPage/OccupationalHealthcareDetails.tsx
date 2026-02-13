import { OccupationalHealthcareEntry } from "../../types";

export const OccupationalHealthcareDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <h4>occupational</h4>
      <table>
        <tbody>
          <tr>
            <td>employer</td>
            <td>{entry.employerName}</td>
          </tr>
          <tr>
            <td>sick leave</td>
            <td>
              from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
