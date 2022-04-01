const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.static('build'))

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

app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status - :response-time ms :body'))

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

const generateId = () => {
  return Math.floor(Math.random() * 10000);
}
app.post('/api/persons', (request, response) => {
  const person = request.body

  // name empty
  if (!person.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  // number empty
  if (!person.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  // name duplicated
  if (persons.find( p => p.name === person.name )) {
    return response.status(400).json({ 
      error: 'name duplicated' 
    })
  }

  const newPerson = {
    "id": generateId(),
    "name": person.name, 
    "number": person.number
  }

  persons = persons.concat(newPerson)

  response.status(200)
  response.json(newPerson)
})

app.get('/info', (request, response) => {
  const phonebook_msg = `Phonebook has info for ${persons.length} people`
  const date_msg = new Date().toString()
  response.send(`${phonebook_msg} <br> ${date_msg}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)