import { Entry as EntryData } from "../../types";

export const Entry = ({ entry }: { entry: EntryData }) => {
  return (
    <div>
      {entry.date} {entry.description}
      <ul>
        {entry.diagnosisCodes.map((code, i) => (
          <li key={i}>{code}</li>
        ))}
      </ul>
    </div>
  );
};
