import { Diagnosis, Entry as EntryData } from "../../types";
import { EntryDetails } from "./EntryDetails";

export const Entry = ({
  entry,
  diagnoses,
}: {
  entry: EntryData;
  diagnoses?: Diagnosis[];
}) => {
  const getDiagnosis = (code: string, i: number) => (
    <li key={i}>
      {code}{" "}
      {!diagnoses
        ? "loading..."
        : diagnoses.find((dg) => dg.code === code)?.name || ""}
    </li>
  );

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        {entry.date} {entry.description}
        {entry.diagnosisCodes ? (
          <ul>{entry.diagnosisCodes.map(getDiagnosis)}</ul>
        ) : (
          <></>
        )}
        diagnose by {entry.specialist}
      </div>
      <div style={{ flex: 1 }}>
        <EntryDetails entry={entry} />
      </div>
    </div>
  );
};
