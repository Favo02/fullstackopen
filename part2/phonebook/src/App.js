import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1233333' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {}
    newPerson.name = newName
    newPerson.number = newNumber

    if (persons.filter( person => person.name === newPerson.name).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    let copy = [...persons]
    copy = copy.concat(newPerson)
    setPersons(copy)
  } 

  const editInputName = (event) => {
    setNewName(event.target.value)
  }

  const editInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      { persons.map( person => ( <p key={person.name}>{person.name} {person.number}</p> )) }
    </div>
  )
}

export default App