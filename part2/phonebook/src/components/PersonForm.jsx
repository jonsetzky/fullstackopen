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

export default PersonForm;
