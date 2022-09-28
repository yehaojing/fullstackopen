import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      blogService.setToken('')
      setUser(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService.postNewBlog(newBlog)
      .then(
        resp => {
          newBlog.id = resp.id
          setBlogs(blogs.concat(newBlog))
          setNewBlogMessage(`a new blog "${newBlog.title}" by ${newBlog.author} added`)
          setTimeout(() => {
            setNewBlogMessage(null)
          }, 5000)
        })
      .catch((error) => {
        setErrorMessage(`${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const likeBlogHandler = async (blog) => {
    const response = await blogService.likeBlog(blog)
    return response.data
  }

  const deleteBlogHandler = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.deleteBlog(blog)
        .then(() => setBlogs(blogs.filter(item => item !== blog)))
        .catch((error) => {
          setErrorMessage(`${error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Notification message={newBlogMessage} className="new" />
      <Notification message={errorMessage} className="error" />
      {
        user === null
          ? <LoginForm loginHandler={handleLogin} />
          : <>
            <div>
              Logged in as {user.name} <Button text="logout" handler={logoutHandler} />
            </div>
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
              </Togglable>
            </div>
            <h2>Blogs</h2>
            {blogs
              .sort((blogA, blogB) => blogB.likes - blogA.likes)
              .map((blog) => <Blog key={blog.id} blog={blog} likeBlogHandler={likeBlogHandler} deleteBlogHandler={deleteBlogHandler} />)}
          </>
      }
    </div>
  )
}

export default App