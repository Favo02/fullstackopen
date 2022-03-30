import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)

    // const fakePerson = { 
    //     "name": "Fake Person", 
    //     "number": "111111111",
    //     "id": 10000
    // }

    // return request.then(response => response.data.concat(fakePerson))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const deleteUrl = `${baseUrl}/${id}`
    const request = axios.delete(deleteUrl)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const updateUrl = `${baseUrl}/${id}`
    const request = axios.put(updateUrl, newObject)
    return request.then(response => response.data)
}

export default {
    getAll, create, deletePerson, update
}