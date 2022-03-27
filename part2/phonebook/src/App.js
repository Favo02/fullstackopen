import { useState, useEffect } from "react";
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
