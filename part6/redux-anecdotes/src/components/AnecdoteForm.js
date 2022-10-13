import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    return (
        <>
            <h2>create new</h2>
                <form onSubmit={async (event) => {
                    event.preventDefault()
                    const content = event.target.anecdote.value
                    event.target.anecdote.value = ''
                    dispatch(showNotification(`Created new anecdote: ${content}`))
                    dispatch(createAnecdote(content))
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