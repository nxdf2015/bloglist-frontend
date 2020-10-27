import React, { useState } from 'react'


const Blog = ({ blog , updateLike, removeBlog }) => {


  const [detailsVisible, setVisible] = useState(false)



  const handlerLike = () => updateLike(blog)


  const handlerRemove = () => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)){
      removeBlog(blog)
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
    <div>likes  {likes} <button className='btn-like' onClick={handlerLike} >like</button></div>
  </div>
)

export default Blog
