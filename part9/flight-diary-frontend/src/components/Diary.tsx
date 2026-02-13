import type { DiaryData } from "../types";

export const Diary = ({ diary }: { diary: DiaryData }) => {
  return <div>{diary.date}</div>;
};
