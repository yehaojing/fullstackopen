import Button from './Button'
import { useState } from 'react'

const Blog = ({blog}) => {
  const [toggleView, setToggleView] = useState(false)
  const inlineStyleView = { display: toggleView ? '' : 'none' }

  return (
    <div className="blog">
      {blog.title} {blog.author} {blog.id} <Button text={toggleView ? "hide" : "show"} handler={() => setToggleView(!toggleView)}/>
        <div style={inlineStyleView}>
          URL: {blog.url}
        </div>
        <div style={inlineStyleView}>
          Likes: {blog.likes} <Button text="Like"/>
        </div>
    </div>
  )
}

export default Blog