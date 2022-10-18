import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    return (
        <>
            <h2>create new</h2>
                <form onSubmit={async (event) => {
                    event.preventDefault()
                    const content = event.target.anecdote.value
                    event.target.anecdote.value = ''
                    props.showNotification(`Created new anecdote: ${content}`)
                    props.createAnecdote(content)
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

const mapDispatchToProps = {  showNotification, createAnecdote }
const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm