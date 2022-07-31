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

const DisplayFeedback = ({feedbackType, text}) => {
  return (
    <p>
      {feedbackType}: {text}
    </p>      
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button text="good" handler={feedbackHandlerFactory(good, setGood)}/>
        <Button text="neutral" handler={feedbackHandlerFactory(neutral, setNeutral)}/>
        <Button text="bad" handler={feedbackHandlerFactory(bad, setBad)}/>
      </div>
      <div>
        <h1>statistics</h1>
        <DisplayFeedback feedbackType="good" text={good}/>
        <DisplayFeedback feedbackType="neutral" text={neutral}/>
        <DisplayFeedback feedbackType="bad" text={bad}/>
      </div>
    </>
  )
}

export default App