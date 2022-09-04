import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')


    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }


    return (
        <div>
            <h1>Add new blog</h1>
            <form onSubmit={addBlog}>
                <div>
                    Title <input value={newTitle} onChange={({target}) => setNewTitle(target.value)} />
                </div>
                <div>
                    Author <input value={newAuthor} onChange={({target}) => setNewAuthor(target.value)} />
                </div>
                <div>
                    URL <input value={newUrl} onChange={({target}) => setNewUrl(target.value)} />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes ={
    createBlog: PropTypes.func.isRequired
}
  
export default BlogForm