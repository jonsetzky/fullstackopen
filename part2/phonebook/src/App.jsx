import { useEffect, useState } from "react";
import personService from "./services/persons.js";
import SearchField from "./components/SearchForm.jsx";
import PersonForm from "./components/PersonForm.jsx";
import PersonList from "./components/PersonList.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then(setPersons);
  }, []);

  const showNotification = (message, isError = false) => {
    const NOTIFICATION_TIMEOUT = 5000;

    clearTimeout(notification?.lastTimeout);
    const lastTimeout = setTimeout(
      () => setNotification(null),
      NOTIFICATION_TIMEOUT,
    );

    setNotification({ message, isError, lastTimeout });
  };

  const addPerson = (event) => {
    event.preventDefault(); // disable form submission

    // handle multiple spaces, leading/trailing spaces and case sensitivity
    const newNameTrimmed = newName.replaceAll(/\s+/g, " ").trim();

    const existingPerson = persons.find(
      (person) => person.name === newNameTrimmed,
    );
    if (existingPerson !== undefined)
      return (
        confirm(
          `${newNameTrimmed} is already in the phonebook. Replace the old number with a new one?`,
        ) &&
        personService
          .update(existingPerson._id, {
            name: newNameTrimmed,
            number: newNumber,
          })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person._id !== updatedPerson._id ? person : updatedPerson,
              ),
            );
            showNotification(`Updated ${updatedPerson.name}`);
          })
          .catch((error) => {
            if (error?.response.status === 400) {
              return showNotification(`${error.response.data.error}`, true);
            }
            if (error?.response.status !== 404) throw error;

            showNotification(
              `Person ${newNameTrimmed} has already been removed from the server`,
              true,
            );
          })
      );

    personService
      .create({ name: newNameTrimmed, number: newNumber })
      .then((newPerson) => {
        setPersons([...persons].concat(newPerson));
        showNotification(`Added ${newNameTrimmed}`);
      })
      .catch((error) => {
        if (error?.response.status !== 400) throw error;
        showNotification(`${error.response.data.error}`, true);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification?.message}
        isError={notification?.isError}
      />
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
        showNotification={showNotification}
      />
    </div>
  );
};

export default App;
