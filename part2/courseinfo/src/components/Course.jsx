const Header = ({courseName}) => <h2>{courseName}</h2>

const Part = ({part, exercises}) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((acc, part) => acc += part.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Content = ({parts}) =>
    parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course