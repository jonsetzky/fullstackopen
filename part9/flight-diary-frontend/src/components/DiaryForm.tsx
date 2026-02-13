import React from "react";
import { useField } from "../hooks";
import diaryService from "../services/diary";
import type { DiaryData } from "../types";

export const DiaryForm = () => {
  const { reset: resetDate, ...date } = useField("text");
  const { reset: resetVisibility, ...visibility } = useField("text");
  const { reset: resetWeather, ...weather } = useField("text");
  const { reset: resetComment, ...comment } = useField("text");

  const reset = () => {
    resetDate();
    resetVisibility();
    resetWeather();
    resetComment();
  };

  const submit: React.SubmitEventHandler<HTMLFormElement> = () => {
    diaryService.create({
      comment: comment.value,
      date: date.value,
      visibility: visibility.value as DiaryData["visibility"], // todo validate
      weather: weather.value as DiaryData["weather"], // todo validate
    });
    reset();
  };

  return (
    <form onSubmit={submit}>
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
