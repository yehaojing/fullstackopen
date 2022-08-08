import axios from 'axios'

const baseUrl = '/api/persons'

const postNewPerson = (newPerson) => {
    return (
        axios.post(baseUrl, newPerson)
    )
}

const getPersons = () => {
    return (
        axios.get(baseUrl)
    )
}

const deletePerson = (id) => {
    const url = `${baseUrl}/${id}`
    return (
        axios.delete(url)
    )
}

const updatePerson = (id, newPerson) => {
    const url = `${baseUrl}/${id}`
    return (
        axios.put(url, newPerson)
    )
}

const exportedObject = {
    getPersons,
    postNewPerson,
    deletePerson,
    updatePerson
}

export default exportedObject


