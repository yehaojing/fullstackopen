const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('request_body', function(req, res) {
    if ((req.method) === 'POST') {
        return JSON.stringify(req.body)
    }
    else {
        return ''
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request_body'))

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

app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => {
        return person.id === id
    })
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)

    response.status(204).end()
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
        const new_person = {
            id: Math.round(Math.random()*Math.pow(10, 9)),
            name: body.name,
            number: body.number
        }
        persons = persons.concat(new_person)
        response.json(new_person)
    }
}) 

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})