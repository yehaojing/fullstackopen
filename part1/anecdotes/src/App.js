import { useState } from 'react'

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  )
}

const randomNumber = () => {
  return (
     Math.floor(Math.random()*7)
  )
}

const randomAnecdoteHandler = (stateUpdate) => {
  return (
    () => stateUpdate(randomNumber)
  )
}

const votingHandler = (votes, selected, stateUpdate) => {
  const copy = [...votes]
  copy[selected] += 1
  return () => stateUpdate(copy)
}

const DisplayVotes = ({votes, selected}) => {
  return (
    <>
      has {votes[selected]} votes
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [votes, upvote] = useState(Array(7).fill(0))
   
  const [selected, setSelected] = useState(0)

  const mostVotedSelection = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <div>
        <h1>
          Anecdote of the day
        </h1>
        {anecdotes[selected]}
      </div>
      <div>
        <DisplayVotes votes={votes} selected={selected}/>
      </div>
      <div>
        <Button text="vote" handler={votingHandler(votes, selected, upvote)}/>
        <Button text="next anecdote" handler={randomAnecdoteHandler(setSelected)}/>
      </div>
      <div>
        <h1>
          Anecdote with the most votes
        </h1>
      </div>
      <div>
        {anecdotes[mostVotedSelection]}
      </div>
      <div>
          <DisplayVotes votes={votes} selected={mostVotedSelection}/>
        </div>
    </div>
  )
}

export default App