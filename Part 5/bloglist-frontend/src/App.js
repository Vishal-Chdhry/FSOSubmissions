import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import NotificationGreen from './components/Notificationgreen'
import Togglable from './components/Togglable'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  if (blogs.length){blogs.sort((a, b) => (a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0))}
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  const handleNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage(
        `A new blog '${returnedBlog.title}' has been created`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
  }

  const blogForm = () => (
    <div className='new Blog'>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={() => updateLikes(blog.id)}
          handleDelete={() => deleteBlog(blog)}
        />
      ))}
      <Togglable buttonLabel='newBlog' ref={blogFormRef}>
        <BlogForm createBlog={handleNewBlog} />
      </Togglable>
    </div>
  )

  const updateLikes = (id) => {
    const blog = blogs.find((n) => n.id === id)
    const newBlog = { ...blog, likes: blog.likes + 1 }

    blogService.update(id, newBlog).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    })
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      blogService
        .del(blog.id)
        .then(blogService.getAll()).then((blogs) => setBlogs(blogs))
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />
      <NotificationGreen message={notificationMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button
              onClick={window.localStorage.removeItem('loggedBlogappUser')}
            >
            logout
            </button>
          </p>
          {blogs.length?blogForm():<div className='newBlog'><Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={handleNewBlog} />
          </Togglable></div>}
        </div>
      )}
    </div>
  )
}

export default App
