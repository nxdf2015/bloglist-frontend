import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const islogged = () => localStorage.getItem("token") !== null;
  const [logged, setLogged] = useState(islogged());

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const [message, setMessage] = useState("");

  const [visible, setVisible] = useState(false);

  const [type, setType] = useState("success");

  const getState = (state, response) => {
    setLogged(state);
    setMessage(state ? "logged" : "deconnected");

    if (response.status === 200) {
      setType("success");
    } else {
      setType("error");
    }
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  const addBlog = (response) => {
    setVisible(true);

    const blog = response;
    setType("success");
    setMessage(`A new blog ${blog.title} by ${blog.author} added`);
    setBlogs((blogs) => [...blogs, blog]);

    setTimeout(() => setVisible(false), 2000);
  };

  const wait = (f) => {
    setVisible(true);
    f();
    setTimeout(() => setVisible(false), 2000);
  };

  const handlerError = ({ data, status, message }) => {
    console.log(data);

    wait(() => {
      setType("error");
      setMessage(message);
    });
  };

  return (
    <div>
      <Login getState={getState} handlerError={handlerError} />
      {visible && <Notification message={message} type={type} />}
      {logged && (
        <div>
          {logged}

          <h2>blogs</h2>
          <CreateBlog addBlog={addBlog} handlerError={handlerError} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
