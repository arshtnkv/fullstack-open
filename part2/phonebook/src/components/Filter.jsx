const Filter = ({value, handleChange}) => {
  return (
    <div>
      filter show with <input value={value} onChange={handleChange} />
    </div>
  )
}

export default Filter