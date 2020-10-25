import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , updateBlog, removeBlog }) => {


  const [detailsVisible, setVisible] = useState(false)



  const handlerLike = () => updateBlog(blog)


  const handlerRemove = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)){
      blogService.remove(blog)
      removeBlog(blog.id)
    }
  }

  return (
    <div className='blog-container'>
      {detailsVisible ? <BlogDetails {...blog} handlerLike={handlerLike} /> : <div className='blog-info'>{blog.title}</div>}

      <button className='btn-view' onClick={() => setVisible((visible) => !visible)}>
        {detailsVisible ? 'hidde' : 'view'}
      </button>

      <button onClick={handlerRemove}>remove</button>
    </div>
  )
}


const BlogDetails = ({   title, author, likes ,handlerLike }) => (
  <div className="blog-details">
    <div>{title}</div>
    <div>{author}</div>
    <div>likes {likes} <button className='btn-click' onClick={handlerLike} >like</button></div>
  </div>
)

export default Blog
