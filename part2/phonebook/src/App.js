import { useState } from 'react'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState("")

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).indexOf(newName) === -1) {
            setPersons(persons.concat({name: newName, number:newNumber}))
            setNewName("")
            setNewNumber("")
        } else {
            window.alert(`${newName} is already added to phonebook!`)
        }
    }

    const handlePersonFormChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberFormChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const Numbers = ({persons}) => {
        const personsToShow = persons.filter(person => person.name.toLowerCase().indexOf(filter) >= 0)
        const component = personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)
        return component
    }

    console.log(persons)

    return (
        <div>
        <h2>Phonebook</h2>
        <form>
            <div>
            name: <input value={filter} onChange={handleFilterChange}/>
            </div>
        </form>
        <h2>Add a Number</h2>
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={handlePersonFormChange}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNumberFormChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        <Numbers persons={persons}/>
        </div>
    )
    }

export default App