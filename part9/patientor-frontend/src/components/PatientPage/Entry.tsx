import { Diagnosis, Entry as EntryData } from "../../types";

export const Entry = ({
  entry,
  diagnoses,
}: {
  entry: EntryData;
  diagnoses?: Diagnosis[];
}) => {
  return (
    <div>
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
    </div>
  );
};
