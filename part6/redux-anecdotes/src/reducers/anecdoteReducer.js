import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        updateAnecdote(state, action) {
          const id = action.payload.id
          const changedAnecdote = action.payload
          return state.map(
            a => a.id !== id ? a : changedAnecdote
          )
        },
        addAnecdote(state, action) {
          state.push(action.payload)
        },
        setAnecdotes(state, action) {
          return action.payload
        }
    }
  }
)

export const { updateAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const payload = { content: anecdote.content, votes: anecdote.votes + 1 }
    const upvotedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, payload)
    dispatch(updateAnecdote(upvotedAnecdote))
  }
}


export default anecdoteSlice.reducer