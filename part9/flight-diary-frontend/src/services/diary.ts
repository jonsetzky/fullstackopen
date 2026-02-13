import axios from "axios";
import type { DiaryData } from "../types";

const BASE_URL = "/api/diaries";

const getAll = async (): Promise<DiaryData[]> => {
  const resp = await axios.get(BASE_URL);
  return resp.data;
};

export default { getAll };
