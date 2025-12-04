import { useEffect, useState } from "react";
import countryService from "./services/countries.js";
import SearchField from "./components/SearchField.jsx";
import { Countries } from "./components/Countries.jsx";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then(setCountries);
  }, []);

  return (
    <div>
      <SearchField setSearchFilter={setFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default App;
