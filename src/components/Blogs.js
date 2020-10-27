import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'

const Blogs = ({ blogs, updateLike, removeBlog, sorted }) => {
  if (sorted) {
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  }
  return  <div data-test="list-blog">{
    blogs.map((blog) => (
      <Blog key={blog.id} removeBlog={removeBlog} updateLike={updateLike} blog={blog} />))}
  </div>

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
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  sorted: PropTypes.bool,
}

export default Blogs
