import personService from "../services/persons.js";

const PersonList = ({
  persons,
  setPersons,
  searchFilter,
  showNotification,
}) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(searchFilter.toLowerCase()),
      )
      .map((person) => (
        <span key={person.name}>
          {person.name} {person.number}
          <button
            onClick={() => {
              confirm(`Are you sure you want to delete ${person.name}?`) &&
                personService
                  .remove(person._id)
                  .then(() => {
                    setPersons(persons.filter((p) => p._id !== person._id));
                    showNotification(`Deleted ${person.name}`);
                  })
                  .catch(() => {
                    showNotification(`Failed to delete ${person.name}`, true);
                  });
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
