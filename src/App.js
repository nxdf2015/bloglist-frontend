import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'

import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const islogged = () => localStorage.getItem('token') !== null
  const [logged, setLogged] = useState(islogged())

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const [message, setMessage] = useState('')

  const [visible, setVisible] = useState(false)

  const [type, setType] = useState('success')

  const [sorted, setSorted] = useState(false)

  const getState = (state, response) => {
    setLogged(state)
    setMessage(state ? 'logged' : 'deconnected')

    if (response.status === 200) {
      setType('success')
    } else {
      setType('error')
    }
    setVisible(true)
    setTimeout(() => setVisible(false), 2000)
  }

  const addBlog = (response) => {
    setVisible(true)

    const blog = response
    setType('success')
    setMessage(`A new blog ${blog.title} by ${blog.author} added`)
    setBlogs((blogs) => [...blogs, blog])

    setTimeout(() => setVisible(false), 2000)
  }

  const wait = (f) => {
    setVisible(true)
    f()
    setTimeout(() => setVisible(false), 2000)
  }

  const handlerError = ({ data, message }) => {
    wait(() => {
      setType('error')
      setMessage(message || data)
    })
  }

  const updateBlog = (id) => {
    setBlogs((blogs) =>
      blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    )
  }

  const removeBlog = (id) => {
    setBlogs((blogs) => blogs.filter((blog) => blog.id !== id))
  }

  const handleSortBlog = () => {
    setSorted(true)
  }

  return (
    <div>
      <Login getState={getState} handlerError={handlerError} />
      {visible && <Notification message={message} type={type} />}
      {logged && (
        <div>
          {logged}

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
