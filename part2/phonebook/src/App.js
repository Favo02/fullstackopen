import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then(newPerson => { setPersons(newPerson) })
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

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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

  const deletePerson = (id, name) => {
    const message = `Delete ${name}?`
    if (!window.confirm(message)) {
      return
    }

    personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter( person => person.id !== id ))
      })
      .catch(() => {
        alert('Person already deleted')
        setPersons(persons.filter( person => person.id !== id ))
      })
  }

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
        valueInputName={newName}
        editInputNumber={editInputNumber}
        valueInputNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons
        filtered={filtered}
        deletePerson={deletePerson}
      />

    </div>
  );
};

export default App;
