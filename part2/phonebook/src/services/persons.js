import axios from 'axios'
const BASE_URL = 'http://localhost:3001/persons'

const getPerson = () => {
  const request = axios.get(BASE_URL)
  return request.then(res => res.data)
}

const postPerson = (newPerson) => {
  const request = axios.post(BASE_URL, newPerson)
  return request.then(res => res.data)
}

const putPerson = (id, modifiedObj) => {
  const request = axios.put(`${BASE_URL}/${id}`, modifiedObj)
  return request.then(res => res.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then(res => res.data)
}

export default {getPerson, postPerson, putPerson, deletePerson}