import personService from "../services/persons.js";

const PersonList = ({ persons, setPersons, searchFilter }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
      .map((person) => (
        <span key={person.name}>
          {person.name} {person.number}
          <button
            onClick={() => {
              confirm(`Are you sure you want to delete ${person.name}?`) &&
                personService
                  .remove(person.id)
                  .then(() =>
                    setPersons(persons.filter((p) => p.id !== person.id))
                  );
            }}
          >
            delete
          </button>
          <br />
        </span>
      ))}
  </div>
);

export default PersonList;
