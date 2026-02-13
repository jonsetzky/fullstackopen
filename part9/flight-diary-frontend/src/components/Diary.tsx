import type { DiaryData } from "../types";

export const Diary = ({ diary }: { diary: DiaryData }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </div>
  );
};
