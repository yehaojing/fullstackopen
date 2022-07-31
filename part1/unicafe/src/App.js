import { useState } from 'react'

const feedbackHandlerFactory = (counter, stateUpdate) => {
  const handler = () => {
    stateUpdate(counter + 1)
  }
  return handler
}

const Button = ({text, handler}) => {
  return(
    <button onClick={handler}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>
      {text}: {value}
    </p>      
  )
}

const Statistics = ({good, neutral, bad}) => {
  // use good, neutral and bad from Statistics scope
if (good === 0) {
  return (
    <div>
      No feedback given.
    </div>
  )
} 
  else {
    return(
      <div>
        <h1>Statistics</h1>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="All" value={good + neutral + bad}/>
        <StatisticLine text="Average" value={(good + 0*neutral + -1*bad)/3}/>
        <StatisticLine text="Positive" value={(good/(good+neutral+bad)*100).toString() + "%"}/>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button text="Good" handler={feedbackHandlerFactory(good, setGood)}/>
        <Button text="Neutral" handler={feedbackHandlerFactory(neutral, setNeutral)}/>
        <Button text="Bad" handler={feedbackHandlerFactory(bad, setBad)}/>
      </div>
      <div>
        <Statistics good={good} bad={bad} neutral={neutral}/>
      </div>
    </>
  )
}

export default App