import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getPerson()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addName = (e) => {
    e.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    
    if(!existingPerson) {
      const newPerson = { name: newName, number: newNumber, id: String(persons.length + 1) }
      personService
      .postPerson(newPerson).then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
    } else {
      if(window.confirm(`${newName} уже добавлен в телефонную книгу. Заменить старый номер на новый?`)) {
        const modifiedObj = {...existingPerson, number: newNumber}
        personService
          .putPerson(existingPerson.id, modifiedObj)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id === existingPerson.id ? updatedPerson : person
            ))
          })
          .catch(error => {
            console.error(error);
            setErrorMessage(`Information of ${existingPerson.name} has already been removed from server`)
          })
      }
    }
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearchField(e.target.value)
  const handleDeletePerson = (id, name) => {
    if(window.confirm(`delete ${name}`)) {
      personService
        .deletePerson(id).then(() => {
          const updatedPersons = persons.filter(person => person.id != id)
          setSuccessMessage(`delete ${name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
          setPersons(updatedPersons)
        })
        .catch(error => {
          console.error(error)
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  const filteredPerson = persons.filter(person =>
      person.name.toLowerCase().includes(searchField.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className='success-message' />
      <Notification message={errorMessage} className='error-message' />
      <Filter value={searchField} handleChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Persons persons={filteredPerson} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App