import Button from './Button'
import { useState } from 'react'

const Blog = ({blog, likeBlogHandler}) => {
  const [toggleView, setToggleView] = useState(false)
  const inlineStyleView = { display: toggleView ? '' : 'none' }

  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const likeBlog = (event) => {
    event.preventDefault()
    likeBlogHandler(blog)
    setBlogLikes(blogLikes + 1)

  }

  return (
    <div className="blog">
      {blog.title} {blog.author} {blog.id} <Button text={toggleView ? "hide" : "show"} handler={() => setToggleView(!toggleView)}/>
        <div style={inlineStyleView}>
          URL: {blog.url}
        </div>
        <div style={inlineStyleView}>
          Likes: {blogLikes} <Button text="Like" handler={likeBlog}/>
        </div>
    </div>
  )
}

export default Blog