const PersonForm = ({
  handleNameChange,
  handleNumberChange,
  onSubmit,
  newName,
  newNumber
}) => {
  return (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} required />
    </div>
    <div>
    number: <input value={newNumber} onChange={handleNumberChange} required />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
export default PersonForm