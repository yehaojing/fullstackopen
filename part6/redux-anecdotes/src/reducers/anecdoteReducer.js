import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        vote(state, action) {
          const id = action.payload
          const anecdoteToChange = state.find(a => a.id === id)
          const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
          }
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

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

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


export default anecdoteSlice.reducer