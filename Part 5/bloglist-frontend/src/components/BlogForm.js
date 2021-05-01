import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newLikes, setLikes] = useState(0)
  const [newUrl, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    })
    setTitle('')
    setAuthor('')
    setLikes(0)
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new blog</h2>

      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            id='title'
            type='text'
            value={newTitle}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type='text'
            value={newAuthor}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type='text'
            value={newUrl}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes
          <input
            id='likes'
            type='number'
            value={newLikes}
            name='Likes'
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default BlogForm
