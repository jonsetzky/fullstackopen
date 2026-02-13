import React, { useState } from "react";
import { useField } from "../hooks";
import diaryService from "../services/diary";
import { visibilityOptions, weatherOptions, type DiaryData } from "../types";
import axios from "axios";

export const DiaryForm = () => {
  const { reset: resetDate, ...date } = useField("date");
  const [visibility, setVisibility] = useState<DiaryData["visibility"]>();
  const [weather, setWeather] = useState<DiaryData["weather"]>();

  const { reset: resetComment, ...comment } = useField("text");
  const [error, setError] = useState("");

  const reset = () => {
    resetDate();
    setVisibility(undefined);
    setWeather(undefined);
    resetComment();
  };

  const submit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (date.value.length === 0) {
      setError("a date must be selected");
      return;
    }
    if (!visibility) {
      setError("visibility must be selected");
      return;
    }
    if (!weather) {
      setError("weather must be selected");
      return;
    }

    // return;
    try {
      await diaryService.create({
        comment: comment.value,
        date: date.value,
        visibility: visibility,
        weather: weather,
      });
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.status === 400 &&
          error.response &&
          "data" in error.response &&
          typeof error.response.data === "string"
        ) {
          setError(error.response.data.replace("Something went wrong. ", ""));
          return;
        }
        console.error("unknown axios error", error.toJSON());
        return;
      }
      console.error("unknown error", error);
    }
    return false;
  };

  return (
    <form onSubmit={submit}>
      <h2>Add a new entry</h2>
      <p style={{ color: "#f00" }}>{error}</p>
      <div>
        date <input {...date} />
      </div>
      <div>
        visibility{" "}
        <select
          name="visibility"
          onChange={(evt) =>
            setVisibility(
              evt.target.value === "none" ? undefined : evt.target.value,
            )
          }
          value={visibility || "none"}
        >
          <option value={"none"}></option>
          {visibilityOptions.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        weather{" "}
        <select
          name="weather"
          onChange={(evt) =>
            setWeather(
              evt.target.value === "none" ? undefined : evt.target.value,
            )
          }
          value={weather || "none"}
        >
          <option value={"none"}></option>
          {weatherOptions.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        comment <input {...comment} />
      </div>
      <button>create</button>
    </form>
  );
};
