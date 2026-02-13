import React, { useState } from "react";
import { useField } from "../hooks";
import diaryService from "../services/diary";
import type { DiaryData } from "../types";
import axios from "axios";

export const DiaryForm = () => {
  const { reset: resetDate, ...date } = useField("text");
  const { reset: resetVisibility, ...visibility } = useField("text");
  const { reset: resetWeather, ...weather } = useField("text");
  const { reset: resetComment, ...comment } = useField("text");
  const [error, setError] = useState("");

  const reset = () => {
    resetDate();
    resetVisibility();
    resetWeather();
    resetComment();
  };

  const submit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      await diaryService.create({
        comment: comment.value,
        date: date.value,
        visibility: visibility.value as DiaryData["visibility"], // todo validate
        weather: weather.value as DiaryData["weather"], // todo validate
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
        visibility <input {...visibility} />
      </div>
      <div>
        weather <input {...weather} />
      </div>
      <div>
        comment <input {...comment} />
      </div>
      <button>create</button>
    </form>
  );
};
