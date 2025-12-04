import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button
            onClick={(event) => {
              event.preventDefault(); // disable form submission

              // handle multiple spaces, leading/trailing spaces and case sensitivity
              const newNameTrimmed = newName.replaceAll(/\s+/g, " ").trim();

              if (persons.some((person) => person.name === newNameTrimmed))
                return alert(`${newNameTrimmed} is already in the phonebook`);
              setPersons(
                [...persons].concat({
                  name: newNameTrimmed,
                })
              );
            }}
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
