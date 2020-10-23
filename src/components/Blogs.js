import React from "react";

import Blog from "./Blog";

const Blogs = ({ blogs, updateBlog, removeBlog, sorted }) => {
  if (sorted) {
    blogs.sort((a, b) => a.likes < b.likes ? 1 : -1 );
  }
  return blogs.map((blog) => (
    <Blog removeBlog={removeBlog} updateBlog={updateBlog} key={blog.id} blog={blog}  />
  ));
};

export default Blogs;
