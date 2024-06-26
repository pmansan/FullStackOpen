import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.total > 0) {
    return (
      <>
        <h1> statistics </h1>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={props.good}/>
            <StatisticLine text={"neutral"} value={props.neutral}/>
            <StatisticLine text={"bad"} value={props.bad}/>
            <StatisticLine text={"all"} value={props.total}/>
            <StatisticLine text={"average"} value={((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / props.total}/>
            <StatisticLine text={"positive"} value={(props.good / props.total) * 100 + '%' }/>
          </tbody>
        </table>
      </>)
  } else {
    return (
      <p>
        No feedback given
      </p>
    )
  }
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h1> give feedback </h1>
      <Button onClick={() => { setGood(good + 1) }} text='good'/>
      <Button onClick={() => { setNeutral(neutral + 1) }}text='neutral'/>
      <Button onClick={() => { setBad(bad + 1) }}text='bad'/>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  )
}

export default App
