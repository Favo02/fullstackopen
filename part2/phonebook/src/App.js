import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const notificationNull = { type: 'notification', message: null }
  const [notification, setNotification] = useState(notificationNull)


  useEffect(() => {
    personsService
      .getAll()
      .then(newPerson => { setPersons(newPerson) })
      .catch(error => {
        console.log(error.response);
        const newNotification = { type: 'error', message: `Error fetching the phonebook (error code: ${error.response.status})` }
        setNotification(newNotification)
          setTimeout(() => {
            setNotification(notificationNull)
          }, 5000)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {};
    newPerson.name = newName;
    newPerson.number = newNumber;
    newPerson.id = persons.length + 1;

    let updateId = -1
    if (persons.filter((person) => { 
      if (person.name === newPerson.name) {
        updateId = person.id
        return true
      }
      return false
    }).length > 0) {
      newPerson.id = updateId
      personsService
        .update(updateId, newPerson)
        .then(updatedPerson => {
          console.log("update persons");
          setPersons( persons.map( person => person.id === updatedPerson.id ? updatedPerson : person) )
          const newNotification = { type: 'notification', message: `${updatedPerson.name} updated` }
          setNotification(newNotification)
          setTimeout(() => {
            setNotification(notificationNull)
          }, 5000)
        })
        .catch(error => {
          let newNotification = ""
          if (error.response.status === 404) {
            newNotification = { type: 'error', message: `${newPerson.name} not found on the server (error code: 404)` }
            setPersons(persons.filter( person => person.id !== updateId ))
          }
          else if (error.response.status === 400) {
            newNotification = { type: 'error', message: `${error.response.data.error} (error code: 400)` }
          }
          setNotification(newNotification)
          setTimeout(() => {
            setNotification(notificationNull)
          }, 5000)
        })
      return;
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        const newNotification = { type: 'notification', message: `${returnedPerson.name} added` }
        setNotification(newNotification)
        setTimeout(() => {
          setNotification(notificationNull)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response);
        const newNotification = { type: 'error', message: `Error ${error.response.data.error} (error code: ${error.response.status})` }
        setNotification(newNotification)
          setTimeout(() => {
            setNotification(notificationNull)
          }, 5000)
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

  const filtered = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

  const deletePerson = (id, name) => {
    const message = `Delete ${name}?`
    if (!window.confirm(message)) {
      return
    }

    personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter( person => person.id !== id ))
        const newNotification = { type: 'notification', message: `Person deleted` }
        setNotification(newNotification)
        setTimeout(() => {
          setNotification(notificationNull)
        }, 5000)
      })
      .catch(() => {
        const newNotification = { type: 'error', message: `Person already deleted` }
        setNotification(newNotification)
        setTimeout(() => {
          setNotification(notificationNull)
        }, 5000)
        setPersons(persons.filter( person => person.id !== id ))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} type={notification.type} />

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
