import { useEffect, useState } from "react";
import personService from "./services/persons.js";

const SearchField = ({ setSearchFilter }) => (
  <div>
    filter shown with{" "}
    <input onChange={(event) => setSearchFilter(event.target.value)} />
  </div>
);

const PersonForm = ({ addPerson, setNewName, setNewNumber }) => (
  <form>
    <div>
      name: <input onChange={(event) => setNewName(event.target.value)} />
      <br />
      number: <input onChange={(event) => setNewNumber(event.target.value)} />
    </div>
    <div>
      <button onClick={addPerson}>add</button>
    </div>
  </form>
);

const PersonList = ({ persons, searchFilter }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
      .map((person) => (
        <span key={person.name}>
          {person.name} {person.number}
          <br />
        </span>
      ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(setPersons);
  }, []);

  const addPerson = (event) => {
    event.preventDefault(); // disable form submission

    // handle multiple spaces, leading/trailing spaces and case sensitivity
    const newNameTrimmed = newName.replaceAll(/\s+/g, " ").trim();

    if (persons.some((person) => person.name === newNameTrimmed))
      return alert(`${newNameTrimmed} is already in the phonebook`);

    personService
      .create({ name: newNameTrimmed, number: newNumber })
      .then(() => {
        setPersons(
          [...persons].concat({
            name: newNameTrimmed,
            number: newNumber,
          })
        );
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField setSearchFilter={setSearchFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} searchFilter={searchFilter} />
    </div>
  );
};

export default App;
