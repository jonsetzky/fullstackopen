import type { CoursePart } from "../course";
import { Part } from "./Part";

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};
