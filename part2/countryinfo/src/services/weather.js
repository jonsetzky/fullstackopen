import axios from "axios";
const baseUrl = "https://api.open-meteo.com/v1/forecast";

const cache = {};
// TODO implement cache invalidation strategy

const getAtLatLng = (latitude, longitude) => {
  if (cache[`${latitude},${longitude}`]) {
    return Promise.resolve(cache[`${latitude},${longitude}`]);
  }

  return axios
    .get(
      `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`
    )
    .then((response) => {
      cache[`${latitude},${longitude}`] = response.data;
      return response.data;
    });
};

// maps weather codes from Open-Meteo to OpenWeatherMap icon codes
const getIconUrlForWeatherCode = (weatherCode, isDay) => {
  const codeMap = {
    0: "01",
    1: "01",
    2: "02",
    3: "03",
    45: "50",
    48: "50",
    51: "09",
    53: "10",
    55: "10",
    56: "10",
    57: "10",
    61: "09",
    63: "09",
    65: "09",
    66: "09",
    67: "09",
    71: "13",
    73: "13",
    75: "13",
    77: "13",
    80: "09",
    81: "09",
    82: "09",
    85: "13",
    86: "13",
    95: "11",
    96: "11",
    99: "11",
  };
  return `https://openweathermap.org/img/wn/${codeMap[weatherCode]}${
    isDay ? "d" : "n"
  }@2x.png`;
};

export default {
  getAtLatLng,
  getIconUrlForWeatherCode,
};
