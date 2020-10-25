import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import usersService from './services/users'

import Blogs from './components/Blogs'
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

  const handlerLogin = ({   user }) => {

    if(user){

      usersService.create(user)
        .then(response => {
          const token = response.data.token
          localStorage.setItem('token', token)
          setLogged(true, () => true)
          successNotification( 'logged' )


        })
        .catch(error => {handlerError({ data:error.data , message:'wrong username or password' })

          setLogged(false, () => false)
        }

        )
    }
    else {
      successNotification('deconnected')
      setLogged(false,() => false)

    }

  }

  const notification = (message,type) => {
    setType(type)
    wait(() => setMessage(message))

  }
  const successNotification = message => notification(message,'success')
  const errorNotification = message => notification(message,'error')

  const wait = (f) => {
    setVisible(true)
    f()
    setTimeout(() => setVisible(false), 2000)
  }


  const addBlog = (blog) => {

    blogService.create(blog)
      .then(({ data }) => {
        successNotification(`A new blog ${blog.title} by ${blog.author} added`)
        setBlogs((blogs) => [...blogs, data])})
      .catch(error => handlerError({ ...error.response , message:'error creation blog all fields required' }))

  }


  const handlerError = ({ data, message }) =>  errorNotification(message || data )


  const updateBlog = (blog) => {
    blogService.update(blog)
      .then(response => {
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
      <Login handlerLogin={handlerLogin} />
      {visible && <Notification message={message} type={type} />}
      {logged && (
        <div>
          {logged}

          <h2>blogs</h2>
          <CreateBlog addBlog={addBlog}  />
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
