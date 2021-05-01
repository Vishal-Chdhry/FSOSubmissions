import React, { useState } from 'react'
const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className= 'blog'>
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className= 'togglable'>
        likes: {blog.likes} <button onClick={handleLikes}>like</button> <br/>
        url: {blog.url} <br/>
        author: {blog.author} <br/>
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog
