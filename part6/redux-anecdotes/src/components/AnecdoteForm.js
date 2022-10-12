import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    return (
        <>
            <h2>create new</h2>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    dispatch(showNotification(`Created new anecdote: ${event.target.anecdote.value}`))
                    dispatch(addAnecdote(event.target.anecdote.value))
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