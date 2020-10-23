import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification"


const App = () => {
  const [blogs, setBlogs] = useState([]);

  const islogged = () => localStorage.getItem('token') !== null
  const [logged, setLogged] = useState(islogged() );


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [] );

  
  
  const [message , setMessage] = useState("")
  
  const [ visible , setVisible ] = useState(false)
  
  const [type , setType] = useState('success')
  
  const getState = (state,response) => {
    console.log(response)
     setLogged(state)
     setMessage( response.status === 200  ? (state ? "logged" : "deconnected") : "wrong username or password")
     if (response.status === 200){
        setType('success')
     }
     else {
       setType("error")
     }
     setVisible(true)
     setTimeout(()=> setVisible(false) , 2000)
   
  };
  const updateBlog = (response ) => {
    setVisible(true)
    
    if (response.status === 400){
      setType('error')
      setMessage(response.data)
    }
    else{
      const blog = response.data
      setType('success')
      setMessage(`A new blog ${blog.title} by ${blog.author} added`)
    }

    
    setTimeout(()=> setVisible(false) , 2000) 
    
    blogService.getAll().then((blogs) => setBlogs(blogs))};
    
  return (
    <div>
      <Login getState={getState} />
      { visible && <Notification message={message} type={type}/>}
      {logged && (
        <div>
          {logged}

          <h2>blogs</h2>
          <CreateBlog  updateBlog={updateBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
