import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    return (
        <>
            <h2>create new</h2>
                <form onSubmit={async (event) => {
                    event.preventDefault()
                    const content = event.target.anecdote.value
                    dispatch(showNotification(`Created new anecdote: ${content}`))
                    const newAnecdote = await anecdoteService.createAnecdote(content)
                    dispatch(addAnecdote(newAnecdote))
                    event.target.anecdote.value = ''
                }
                    }>
                    <div>
                        <input name='anecdote'/>
                    </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm