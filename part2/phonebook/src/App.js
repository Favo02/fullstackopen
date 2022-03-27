import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
    newPerson.id = persons.length + 1;

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

      <Filter
        editFilter={editFilter}
      />

      <h3>Add a new</h3>
      
      <PersonForm
        addPerson={addPerson}
        editInputName={editInputName}
        editInputNumber={editInputNumber}
      />

      <h3>Numbers</h3>

      <Persons
        filtered={filtered}
      />

    </div>
  );
};

export default App;
