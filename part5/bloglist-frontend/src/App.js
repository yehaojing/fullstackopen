import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const BlogForm = ({ addBlog, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h1>Add new blog</h1>
      <form onSubmit={addBlog}>
        <div>
          Title <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          URL <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

const LoginForm = ({ loginHandler, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <h1>
        Login
      </h1>
      <form onSubmit={loginHandler}>
        <div>
          Username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newBlogMessage, setNewBlogMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      blogService.setToken('')
      setUser(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Button = ({ text, handler }) => {
    return (
      <button onClick={handler}>
        {text}
      </button>
    )
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const logoutHandler = (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogService.postNewBlog(newTitle, newAuthor, newUrl)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setBlogs(blogs.concat({ title: newTitle, author: newAuthor, url: newUrl }))
    setNewBlogMessage(`a new blog "${newTitle}" by ${newAuthor} added`)
    setTimeout(() => {
      setNewBlogMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notification message={newBlogMessage} className="new"/>
      <Notification message={errorMessage} className="error"/>
      {
        user === null
        ? <LoginForm loginHandler={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
        : <>
            <div>
              Logged in as {user.name} <Button text="logout" handler={logoutHandler} />
            </div>
            <BlogForm
              addBlog={addBlog}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
              newTitle={newTitle}
              newAuthor={newAuthor}
              newUrl={newUrl}
            />
            <h2>Blogs</h2>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </>
        }
    </div>
  )

}

export default App
