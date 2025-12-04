import { useEffect, useState } from "react";
import weatherService from "../services/weather.js";

export const Countries = ({ countries, filter, setFilter }) => {
  const [weather, setWeather] = useState(null);

  const DETAIL_FIELDS = {
    tld: "Top-Level Domain",
    independent: "Independent",
    currencies: "Currencies",
    capital: "Capital",
    region: "Region",
    population: "Population",
    area: "Area (km²)",
  };

  const matchingCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  const exactMatch = matchingCountries.find(
    (country) => country.name.common.toLowerCase() === filter.toLowerCase()
  );
  const country = exactMatch || matchingCountries[0];
  useEffect(() => {
    const capitalLatLng = country?.capitalInfo?.latlng || undefined;
    if (
      capitalLatLng === undefined ||
      (matchingCountries.length > 1 && !exactMatch)
    )
      return;
    weatherService
      .getAtLatLng(...capitalLatLng)
      .then((data) => setWeather(data));
  }, [country, exactMatch, matchingCountries]);

  if (matchingCountries.length === 0) {
    return <div>No matches found</div>;
  }

  if (matchingCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (matchingCountries.length > 1 && !exactMatch)
    return (
      <div>
        {matchingCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setFilter(country.name.common)}>Show</button>
          </div>
        ))}
      </div>
    );

  const createDetailRow = (label, value) => {
    value = country[value];

    if (Array.isArray(value)) {
      if (value.length > 1) label += "s";
      value = value.join(", ");
    }

    if (label === "Currencies" && country.currencies) {
      if (Object.values(country.currencies).length < 2) label = "Currency";
      value = Object.values(country.currencies)
        .map((currency) =>
          `${currency.name} (${currency.symbol})`.replace(
            /\s*\(undefined\)/,
            ""
          )
        )

        .join(", ");
    }

    if (typeof value === "boolean") {
      value = value ? "Yes" : "No";
    }
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }

    return (
      <tr key={label}>
        <td>{label}</td>
        <td>{value}</td>
      </tr>
    );
  };

  return (
    <div>
      <h2
        style={{
          marginBottom: "6px",
        }}
      >
        {country.name.common} ({country.cca2})
      </h2>
      <span>{country.name.official}</span>
      <br />
      <br />

      <table>
        <tbody>
          {Object.entries(DETAIL_FIELDS).map(([fieldKey, fieldLabel]) =>
            createDetailRow(fieldLabel, fieldKey)
          )}
        </tbody>
      </table>
      <h3>Languages:</h3>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
      </ul>
      <img
        src={country.flags && country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="200"
      />
      <h3>Weather in {country.capital}</h3>
      <p>
        Temperature:{" "}
        {weather ? `${weather.current.temperature_2m} °C` : "Loading..."}
        <br />
        Wind: {weather ? `${weather.current.wind_speed_10m} m/s` : "Loading..."}
        <br />
        <img
          src={
            weather
              ? weatherService.getIconUrlForWeatherCode(
                  weather.current.weather_code,
                  true
                )
              : ""
          }
          alt="Weather icon"
        />
      </p>
    </div>
  );
};
