import React, { useState, useEffect  } from 'react'

import blogService from './services/blogs'
import usersService from './services/users'

import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'

import Login from './components/Login'

import Notification from './components/Notification'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const islogged = () => localStorage.getItem('token') !== null
  const [logged, setLogged] = useState(islogged())
  const [  ,  setUser] = useState({})

  const [message, setMessage] = useState('')

  const [visible, setVisible] = useState(false)

  const [type, setType] = useState('success')

  const [sorted, setSorted] = useState(false)

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

  const handlerError = (data   ) =>
    errorNotification(data.message || data.data)



  const updateLike = (blog) => {
    blogService.updateLike(blog).then((response) => {
      const id = response.data.id
      setBlogs((blogs) =>
        blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
        )
      )
    })
  }

  const removeBlog = (blog) => {
    blogService.remove(blog).then(() =>  {
      setBlogs((blogs) => blogs.filter((item) => blog.id !== item.id))
      successNotification(`remove ${blog.title} by ${blog.author}`)
    })
      .catch(error => {
        let message
        if (!localStorage.getItem('token')){
          message=  'you must logged and author of the blog to remove it' }
        else {
          message = 'error connection'
        }
        handlerError({ ...error,message })
      })

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
        </div>
      )}

      <button onClick={handleSortBlog}>sort by like</button>
      <Blogs
        blogs={blogs}
        removeBlog={removeBlog}
        updateLike={updateLike}
        sorted={sorted}
      />
    </div>
  )
}

export default App
