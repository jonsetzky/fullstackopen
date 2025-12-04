import { useEffect, useState } from "react";
import personService from "./services/persons.js";
import SearchField from "./components/SearchForm.jsx";
import PersonForm from "./components/PersonForm.jsx";
import PersonList from "./components/PersonList.jsx";

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

    const existingPerson = persons.find(
      (person) => person.name === newNameTrimmed
    );
    if (existingPerson !== undefined)
      return (
        confirm(
          `${newNameTrimmed} is already in the phonebook. Replace the old number with a new one?`
        ) &&
        personService
          .update(existingPerson.id, {
            name: newNameTrimmed,
            number: newNumber,
          })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
          })
      );

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
      <PersonList
        persons={persons}
        setPersons={setPersons}
        searchFilter={searchFilter}
      />
    </div>
  );
};

export default App;
