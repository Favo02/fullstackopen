import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationIsError, setNotificationIsError] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
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
      setUsername('')
      setPassword('')
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

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }

      const addedBlog = await blogService.create(newBlog)

      setNotificationMessage(`${addedBlog.title} by ${addedBlog.author} created successfully`)
      setNotificationIsError(false)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      const updatedBlogs = blogs.concat(addedBlog)
      setBlogs(updatedBlogs)

      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
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

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} isError={notificationIsError} />
        <h2>Log in to application</h2>
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} isError={notificationIsError} />

      <p>{user.username} logged in<button onClick={logout}>logout</button></p>

      <Blogs blogs={blogs} />

      <NewBlog
        handleNewBlog={handleNewBlog}
        newBlogTitle={newBlogTitle}
        setNewBlogTitle={setNewBlogTitle}
        newBlogAuthor={newBlogAuthor}
        setNewBlogAuthor={setNewBlogAuthor}
        newBlogUrl={newBlogUrl}
        setNewBlogUrl={setNewBlogUrl}
      />

    </div>
  )
}

export default App
