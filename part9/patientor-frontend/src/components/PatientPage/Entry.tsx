import { Diagnosis, Entry as EntryData } from "../../types";
import { EntryDetails } from "./EntryDetails";

export const Entry = ({
  entry,
  diagnoses,
}: {
  entry: EntryData;
  diagnoses?: Diagnosis[];
}) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        {entry.date} {entry.description}
        <ul>
          {entry.diagnosisCodes.map((code, i) => (
            <li key={i}>
              {code}{" "}
              {!diagnoses
                ? "loading..."
                : diagnoses.find((dg) => dg.code === code)?.name || ""}
            </li>
          ))}
        </ul>
        diagnose by {entry.specialist}
      </div>
      <div style={{ flex: 1 }}>
        <EntryDetails entry={entry} />
      </div>
    </div>
  );
};
