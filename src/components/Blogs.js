import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'

const Blogs = ({ blogs, updateBlog, removeBlog, sorted }) => {
  if (sorted) {
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  }
  return blogs.map((blog) => (
    <Blog
      removeBlog={removeBlog}
      updateBlog={updateBlog}
      key={blog.id}
      blog={blog}
    />
  ))
}

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  sorted: PropTypes.bool,
}

export default Blogs
