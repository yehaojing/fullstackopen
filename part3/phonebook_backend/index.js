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

app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(result => response.json(result))
        .catch(error => next(error))

})

app.get('/info', (request, response) => {
    Person
        .countDocuments({})
        .then(resp => {
            response.send(
                `<div>Phonebook has info for ${resp} people</div>
                <div>${new Date()}</div>`
            )
        })
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
        .then(() => response.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        const missing = [
            !body.name ? 'name' : '', 
            !body.number ? 'number' : ''
        ].filter(Boolean).join(', ')
        response.status(400).json({
            'error': `${missing} is missing`
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

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person
        .findByIdAndUpdate(
            request.params.id, 
            { name, number },
            { new: true, runValidators: true, context: 'query' }
        )
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})