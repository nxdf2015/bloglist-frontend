import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'

import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import usersService from './services/users'
import Notification from './components/Notification'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const islogged = () => localStorage.getItem('token') !== null
  const [logged, setLogged] = useState(islogged())
  const [user, setUser] = useState({})

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem('token')

      if (token) {
        usersService
          .decodeToken(token)
          .then((response) => {
            setLogged(true)
            setUser({ username: response.data.username })
          })
          .catch((error) =>
            handlerError({ ...error, message: 'invalid credential' })
          )
      }
    }
    getToken()
  }, [])

  const [message, setMessage] = useState('')

  const [visible, setVisible] = useState(false)

  const [type, setType] = useState('success')

  const [sorted, setSorted] = useState(false)

  const setLogin = (user) => {
    usersService
      .create(user)
      .then((response) => {
        const token = response.data.token
        localStorage.setItem('token', token)
        setLogged(true)
        successNotification(`${user.username}   logged`)
      })
      .catch(() => {
        setLogged(false)
        errorNotification('invalid credential')
      })
    // setLogged(state)
    // setMessage(state ? 'logged' : 'deconnected')

    // if (response.status === 200) {
    //   setType('success')
    // } else {
    //   setType('error')
    // }
    // setVisible(true)
    // setTimeout(() => setVisible(false), 2000)
  }

  const setLogOut = () => {
    setLogged(false)
    localStorage.removeItem('token')
    successNotification('deconnected')
  }

  const wait = (f) => {
    setVisible(true)
    f()
    setTimeout(() => setVisible(false), 2000)
  }

  const notification = (message, type) => {
    setType(type)
    wait(() => setMessage(message))
  }
  const successNotification = (message) => notification(message, 'success')

  const errorNotification = (message) => notification(message, 'error')

  const addBlog = (blog) => {
    blogService
      .create(blog)
      .then(({ data }) => {
        successNotification(`A new blog ${blog.title} by ${blog.author} added`)
        setBlogs((blogs) => [...blogs, data])
      })
      .catch((error) =>
        handlerError({
          ...error.response,
          message: 'error creation blog all fields required',
        })
      )
  }

  const handlerError = ({ data, message }) =>
    errorNotification(message || data)

  const updateBlog = (blog) => {
    blogService.update(blog).then((response) => {
      const id = response.data.id
      setBlogs((blogs) =>
        blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
        )
      )
    })
  }

  const removeBlog = (id) => {
    setBlogs((blogs) => blogs.filter((blog) => blog.id !== id))
  }

  const handleSortBlog = () => {
    setSorted(true)
  }

  return (
    <div>
      <Login setLogin={setLogin} isLogged={logged} setLogOut={setLogOut} />
      {visible && <Notification message={message} type={type} />}
      {logged && (
        <div>
          <h2>blogs</h2>
          <CreateBlog addBlog={addBlog} handlerError={handlerError} />
          <button onClick={handleSortBlog}>sort by like</button>

          <Blogs
            blogs={blogs}
            removeBlog={removeBlog}
            updateBlog={updateBlog}
            sorted={sorted}
          />
        </div>
      )}
    </div>
  )
}

export default App
