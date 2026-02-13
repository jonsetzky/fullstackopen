export interface DiaryData {
  id: number;
  date: string;
  weather: "rainy" | "sunny" | "cloudy" | "stormy" | "windy";
  visibility: "great" | "good" | "ok" | "poor";
}
