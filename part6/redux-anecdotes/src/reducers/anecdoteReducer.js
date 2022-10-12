import { createSlice } from '@reduxjs/toolkit'
const getId = () => (100000 * Math.random()).toFixed(0)

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
          const content = action.payload
          state.push({
              content,
              votes: 0,
              id: getId()
          })
          return state
        },
        setAnecdotes(state, action) {
          return action.payload
        }
    }
  }
)

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer