const express = require('express')
const app = express()

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find( person => person.id === id )
    
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find( person => person.id === id )

  if (person) {
    persons = persons.filter( person => person.id !== id )
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.use(express.json())
const generateId = () => {
  return Math.floor(Math.random() * 10000);
}
app.post('/api/persons', (request, response) => {
  const person = request.body
  console.log(person);

  if (!person.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!person.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const newPerson = {
    "id": generateId(),
    "name": person.name, 
    "number": person.number
  }

  persons = persons.concat(newPerson)

  console.log(persons);
})

app.get('/info', (request, response) => {
  const phonebook_msg = `Phonebook has info for ${persons.length} people`
  const date_msg = new Date().toString()
  response.send(`${phonebook_msg} <br> ${date_msg}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})