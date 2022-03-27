import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {};
    newPerson.name = newName;
    newPerson.number = newNumber;

    if (persons.filter((person) => person.name === newPerson.name).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    let copy = [...persons];
    copy = copy.concat(newPerson);
    setPersons(copy);
  };

  const editInputName = (event) => {
    setNewName(event.target.value);
  };

  const editInputNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const editFilter = (event) => {
    setFilter(event.target.value);
  };

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with <input onChange={editFilter} />
      <h2>Add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={editInputName} />
          <br />
          number: <input onChange={editInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
