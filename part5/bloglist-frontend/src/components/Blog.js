import Button from './Button'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlogHandler, deleteBlogHandler }) => {
  const [toggleView, setToggleView] = useState(false)
  const inlineStyleView = { display: toggleView ? '' : 'none' }

  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const likeBlog = async (event) => {
    event.preventDefault()
    const response = await likeBlogHandler(blog)
    setBlogLikes(response.likes)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    deleteBlogHandler(blog)
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author} {blog.id} <Button text={toggleView ? 'hide' : 'show'} handler={() => setToggleView(!toggleView)}/>
      <div className='url' style={inlineStyleView}>
        URL: {blog.url}
      </div>
      <div className='likes' style={inlineStyleView}>
        Likes: {blogLikes ? blogLikes : 0} <Button text='Like' handler={likeBlog}/>
      </div>
      <div style={inlineStyleView}>
        <Button text='remove' handler={deleteBlog}/>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlogHandler: PropTypes.func.isRequired,
  deleteBlogHandler: PropTypes.func.isRequired
}

export default Blog