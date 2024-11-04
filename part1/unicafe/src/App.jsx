import { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <div>
      <h2>statistics</h2>
      {all > 0 ? (
        <table>
          <tbody>
            <StatisticLine value={good} text="good" />
            <StatisticLine value={neutral} text="neutral" />
            <StatisticLine value={bad} text="bad" />
            <StatisticLine value={all} text="all" />
            <StatisticLine value={average} text="average" />
            <StatisticLine value={`${positive} %`} text="positive" />
          </tbody>
        </table>
        ) : (
          <p>No feedback given</p>
          )}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleClickGood = () => {
    const newGood = good + 1
    setGood(newGood)
    setAll(newGood + neutral + bad)
    setAverage(average + 1)
  }
  
  const handleClickNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setAll(newNeutral + good + bad)
    setAverage(average)
  }
  
  const handleClickBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    setAll(newBad + good + neutral)
    setAverage(average - 1)
  }

  const newAverage = all > 0 ? (average / all).toFixed(2) : 0
  const positive = all > 0 ? ((good / all) * 100).toFixed(2) : 0

  return (
    <div>
      <Header />
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={newAverage}
        positive={positive}
        />
    </div>
  )
}

export default App