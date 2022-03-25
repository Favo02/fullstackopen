import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button clickHandler={clickGood} text={"good"} />
      <Button clickHandler={clickNeutral} text={"neutral"} />
      <Button clickHandler={clickBad} text={"bad"} />
      <h1>statistics</h1>
      <Visualizer text={"good"} score={good} />
      <Visualizer text={"neutral"} score={neutral} />
      <Visualizer text={"bad"} score={bad} />
      <Stats scores={[good, neutral, bad]} />
    </>
  )
}

const Button = ({ clickHandler, text }) => <button onClick={clickHandler}>{text}</button>

const Visualizer = ({ text, score }) => <p>{text} {score}</p>

const Stats = (props) => {
  const [good, neutral, bad] = props.scores
  const all = good + neutral + bad
  const average = (good - bad) / all
  const perc = (good / all) * 100
  return (
    <>
      <Visualizer text={"all"} score={all} />
      <Visualizer text={"average"} score={average} />
      <p>positive {perc} %</p>
    </>
  )
}

export default App