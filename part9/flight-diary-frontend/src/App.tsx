import { useEffect, useState } from "react";
import type { DiaryData } from "./types";
import diaryService from "./services/diary";
import { Diary } from "./components/Diary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryData[]>([]);

  useEffect(() => {
    (async () => {
      setDiaries(await diaryService.getAll());
    })();
  }, []);

  return (
    <div>
      {diaries.map((diary) => (
        <Diary diary={diary} />
      ))}
    </div>
  );
};

export default App;
