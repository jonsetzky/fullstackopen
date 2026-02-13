import React from "react";
import type { CoursePart } from "../course";

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "group":
      break;

    default:
      break;
  }

  return (
    <div>
      <p>
        <b>
          {part.name} {part.exerciseCount}
        </b>
      </p>

      {(() => {
        switch (part.kind) {
          case "group":
            return (
              <>
                <div>{part.groupProjectCount} group projects</div>
              </>
            );
          case "basic":
            return (
              <span>
                <i>{part.description}</i>
              </span>
            );
          case "background":
            return (
              <>
                <div>submit to {part.backgroundMaterial}</div>
              </>
            );
          case "special":
            return (
              <>
                <span>
                  <i>{part.description}</i>
                </span>
                <div>required skills: {part.requirements.join(", ")}</div>
              </>
            );
            return;
          default:
            break;
        }
      })()}
    </div>
  );
};
