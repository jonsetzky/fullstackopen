import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault(); // disable form submission

    // handle multiple spaces, leading/trailing spaces and case sensitivity
    const newNameTrimmed = newName.replaceAll(/\s+/g, " ").trim();

    if (persons.some((person) => person.name === newNameTrimmed))
      return alert(`${newNameTrimmed} is already in the phonebook`);
    setPersons(
      [...persons].concat({
        name: newNameTrimmed,
        number: newNumber,
      })
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} />
          <br />
          number:{" "}
          <input onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <span key={person.name}>
          {person.name} {person.number}
          <br />
        </span>
      ))}
    </div>
  );
};

export default App;
