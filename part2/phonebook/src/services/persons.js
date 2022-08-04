import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

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

export default {
    getPersons: getPersons,
    postNewPerson: postNewPerson,
    deletePerson: deletePerson
}


