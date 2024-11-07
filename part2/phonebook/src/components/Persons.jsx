const Person = ({person, handleDeletePerson}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => handleDeletePerson(person.id, person.name)}>delete</button>
    </li>
  )
}

const Persons = ({persons, handleDeletePerson}) => {
  return (
    <ul>
      {
        persons.map(person => <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson} />)
      }
  </ul>
  )
}

export default Persons
