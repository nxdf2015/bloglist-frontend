import React, { useState } from 'react'

const defaultBlog = { title: '', author: '', url: '' }

const CreateBlog =  ({ addBlog ,toogleVisibility }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleCreate =  (event) => {
    event.preventDefault()
    addBlog(blog)
    toogleVisibility()
    setBlog(defaultBlog)

  }


  return (
    <div>
      <h1>create new</h1>
      <form data-test="create-form"onSubmit={handleCreate}>
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
