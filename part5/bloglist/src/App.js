import { useState, useEffect, useRef } from 'react'

import Login from './components/Login'

import Notification from './components/Notification'
import Togglable from './components/Togglable'

import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationIsError, setNotificationIsError] = useState(false)
  
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      setNotificationMessage(`${user.username} logged in successfully`)
      setNotificationIsError(false)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    }
    catch (exception) {
      console.log('wrong credentials')

      setNotificationMessage(`error: wrong credentials`)
      setNotificationIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    setNotificationMessage(`logged out`)
    setNotificationIsError(false)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const newBlog = async (newBlogObject) => {
    
    try {
      console.log(newBlogObject);
      const addedBlog = await blogService.create(newBlogObject)
      newBlogFormRef.current.toggleVisibility()

      setNotificationMessage(`${addedBlog.title} by ${addedBlog.author} created successfully`)
      setNotificationIsError(false)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      const updatedBlogs = blogs.concat(addedBlog)
      setBlogs(updatedBlogs)
    }
    catch (exception) {
      console.log(exception)

      setNotificationMessage(`error: ${exception}`)
      setNotificationIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const newBlogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} isError={notificationIsError} />
        <h2>Log in to application</h2>
        <Login login={login} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} isError={notificationIsError} />

      <p>{user.username} logged in<button onClick={logout}>logout</button></p>

      <Togglable buttonLabel={'add new blog'} ref={newBlogFormRef}>
        <NewBlog newBlog={newBlog} />
      </Togglable>

      <Blogs blogs={blogs} />

    </div>
  )
}

export default App
