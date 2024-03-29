import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { initialiseAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    state => {
      return state.anecdotes.slice()
      .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
      .filter((anecdote) => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1 )
    }
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialiseAnecdotes())
  }, [dispatch])

  return (
    <>
      {
        anecdotes
          .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(event) => {
                event.preventDefault()
                dispatch(voteAnecdote(anecdote))
                dispatch(showNotification(`You voted "${anecdote.content}"`))
              }}
                >vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList