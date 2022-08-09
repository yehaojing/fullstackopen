require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')
const morgan = require('./morgan.js')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan)

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
    Person
        .find({})
        .then(result => response.json(result))
        .catch(error => next(error))

})

app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>`)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => response.json(person))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        const missing = [
            !body.name ? 'name' : '', 
            !body.number ? 'number' : ''
        ].filter(Boolean).join(", ")
        response.status(400).json({
            "error": `${missing} is missing`
        })
    }
    else if (persons.map(person => person.name).indexOf(body.name) != -1) {
        response.status(409).json({
            error: 'name must be unique'
        })
    }
    else {
        const new_person = new Person({
            name: body.name,
            number: body.number
        })
        new_person
            .save()
            .then(savedNewPerson => response.json(savedNewPerson))
            .catch(error => next(error))
    }
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})