import { useState } from 'react'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        setPersons(persons.concat({name: newName}))
        setNewName("")
    }

    const handlePersonFormChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={handlePersonFormChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        {persons.map(person => <div key={person.name}>name: {person.name}</div>)}
        </div>
    )
    }

export default App