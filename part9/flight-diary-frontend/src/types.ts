export const weatherOptions = [
  "rainy",
  "sunny",
  "cloudy",
  "stormy",
  "windy",
] as const;

export const visibilityOptions = ["great", "good", "ok", "poor"] as const;

export interface DiaryData {
  id: number;
  date: string;
  weather: (typeof weatherOptions)[number];
  visibility: (typeof visibilityOptions)[number];
}

export type NewDiaryData = Omit<DiaryData, "id"> & { comment: string };
