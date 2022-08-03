import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const postNewPerson = (newPerson) => {
    return (
        axios
            .post(baseUrl, newPerson)
    )
}

const getPersons = () => {
    console.log(baseUrl)
    return (
        axios.get(baseUrl)
    )
    
}

export default {
    getPersons: getPersons,
    postNewPerson: postNewPerson
}


