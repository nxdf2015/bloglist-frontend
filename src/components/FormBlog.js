import React, { useState } from 'react'

import blogService from '../services/blogs'

const CreateBlog =  ({ addBlog , handlerError }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleCreate =async (event) => {
    event.preventDefault()
    blogService.create(blog)
      .then(response => addBlog(response.data))
      .catch(error => handlerError({ ...error.response , message:'error creation blog all fields required' }))


  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={({ target }) =>
                setBlog((blog) => ({ ...blog, title: target.value }))
              }
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              name="author"
              value={blog.author}
              onChange={({ target }) =>
                setBlog((blog) => ({ ...blog, author: target.value }))
              }
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              name="url"
              value={blog.url}
              onChange={({ target }) =>
                setBlog((blog) => ({ ...blog, url: target.value }))
              }
            />
          </label>
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog
