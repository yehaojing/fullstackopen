import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const Button = ({text, handler}) => {
    return (
        <button onClick={handler}>
            {text}
        </button>
    )
}

const Persons = ({persons, filter, handleDeletePerson}) => {
    return ( 
        persons
            .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
            .map(person => 
                <div key={person.name}>
                    {person.name} {person.number} <Button text="delete" handler={handleDeletePerson(person.name, person.id)}/>
                </div>
            )
    )
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
            Filter: <input value={filter} onChange={handleFilterChange}/>
            </div>
        </form>
    )
}

const Notification = ({ message, className }) => {
    if (message === null) {
        return null
    }
  
    return (
        <div className={className}>
            {message}
        </div>
    )
}

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [newPersonMessage, setNewPersonMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
      

    const hook = () => {
        personsService
            .getPersons()
            .then(response => {setPersons(response.data)})
    }
    useEffect(hook, [])

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }
        if (persons.map(person => person.name.toLowerCase()).indexOf(newPerson.name.toLowerCase()) === -1) {
            personsService.postNewPerson(newPerson)
                .then(response => {
                    console.log(response)
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setNewPersonMessage(`Added ${newPerson.name}`)
                    setTimeout(() => {
                        setNewPersonMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        } else {
            if (window.confirm(`${newName} is already added to phonebook, would you like to update their number?`)) {
                console.log(persons.filter(person => person.name === newName)[0].id)
                personsService
                    .updatePerson(persons.filter(person => person.name === newName)[0].id, newPerson)
                    .then(response => {
                        setPersons(persons.filter(person => person.name !== newName).concat(response.data))
                        setNewName('')
                        setNewNumber('')
                        setNewPersonMessage(`Updated ${newPerson.name}`)
                        setTimeout(() => {
                            setNewPersonMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMessage(error.response.data.error)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
        }
    }

    const handleDeletePerson = (name, id) => {
        return (
            () => {
                if (window.confirm(`Are you sure you want to remove ${name}?`)) {
                    personsService
                        .deletePerson(id)
                        .then(() => {
                            setErrorMessage(`${name} has been removed.`)
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 5000)
                            personsService
                                .getPersons()
                                .then(response => setPersons(response.data))
                        })
                        .catch(() => {
                            setErrorMessage(`${name} has already been removed.`)
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 5000)
                            personsService
                                .getPersons()
                                .then(response => setPersons(response.data))
                        })
                }
            }
        )
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
            <Notification message={newPersonMessage} className="new"/>
            <Notification message={errorMessage} className="error"/>
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
            <Persons persons={persons} filter={filter} handleDeletePerson={handleDeletePerson}/>
        </div>
    )
}

export default App