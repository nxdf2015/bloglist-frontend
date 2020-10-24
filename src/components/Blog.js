import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , updateBlog, removeBlog }) => {


  const [detailsVisible, setVisible] = useState(false)

  const handlerLike = () => {

    blogService.update(blog)
      .then( ({ data }) => updateBlog(data.id))
  }

  const handlerRemove = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)){
      blogService.remove(blog)
      removeBlog(blog.id)
    }
  }

  return (
    <div className="blog-container">
      {detailsVisible ? <BlogDetails {...blog} handlerLike={handlerLike} /> : blog.title}

      <button onClick={() => setVisible((visible) => !visible)}>
        {detailsVisible ? 'hidde' : 'view'}
      </button>

      <button onClick={handlerRemove}>remove</button>
    </div>
  )
}


const BlogDetails = ({   title, author, likes ,handlerLike }) => (
  <div>
    <div>{title}</div>
    <div>{author}</div>
    <div>likes {likes} <button onClick={handlerLike} >like</button></div>
  </div>
)

export default Blog
