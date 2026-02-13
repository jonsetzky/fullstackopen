import { useEffect, useState } from "react";
import type { DiaryData } from "./types";
import diaryService from "./services/diary";
import { Diary } from "./components/Diary";
import { DiaryForm } from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryData[]>([]);

  useEffect(() => {
    (async () => {
      setDiaries(await diaryService.getAll());
    })();
  }, []);

  return (
    <div>
      <DiaryForm />
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default App;
