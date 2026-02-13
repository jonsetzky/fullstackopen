import axios from "axios";
import type { DiaryData, NewDiaryData } from "../types";

const BASE_URL = "/api/diaries";

const getAll = async (): Promise<DiaryData[]> => {
  const resp = await axios.get(BASE_URL);
  return resp.data;
};

const create = async (
  newDiary: NewDiaryData,
): Promise<NewDiaryData & { id: DiaryData["id"] }> => {
  const resp = await axios.post(BASE_URL, newDiary);
  return resp.data;
};

export default { getAll, create };
