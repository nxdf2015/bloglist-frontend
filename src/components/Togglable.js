import React, { useState } from 'react'


const Togglable = ({ children }) => {
  const [visible , setVisible ] = useState(false)
  const toogleVisibility = () => setVisible(visible => !visible)

  return (<div className="container">
    { children(visible,toogleVisibility)}
    <button data-test="show-form-blog" onClick={() => setVisible(state => !state)}>{visible ? 'cancel' : 'create blog' }</button>
  </div>)

}


export default Togglable