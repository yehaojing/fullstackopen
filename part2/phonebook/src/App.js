import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Persons = ({persons, filter}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
    const component = personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    return component
}

const PersonForm = ({addPerson, handlePersonFormChange, handleNumberFormChange, newName, newNumber}) => {
    return (
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
    )
}

const Filter = ({filter, handleFilterChange}) => {
    return (
    <form>
        <div>
        name: <input value={filter} onChange={handleFilterChange}/>
        </div>
    </form>
    )
}

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState("")

    const hook = () => {
        personsService
            .getPersons()
            .then(response => {setPersons(response.data)})
    }
    useEffect(hook, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).indexOf(newName) === -1) {
            const newPerson = {
                    name: newName,
                    number: newNumber
                }
            
            personsService.postNewPerson(newPerson)
                .then(response => {
                    console.log(response)
                    setPersons(persons.concat(response.data))
                })
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

    return (
        <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
        <h3>Add a Number</h3>
        <PersonForm
            addPerson={addPerson}
            handlePersonFormChange={handlePersonFormChange}
            handleNumberFormChange={handleNumberFormChange}
            newName={newName}
            newNumber={newNumber}
        />
        <h3>Numbers</h3>
        <Persons persons={persons} filter={filter}/>
        </div>
    )
}

export default App