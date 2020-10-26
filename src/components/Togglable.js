import React, { useState } from 'react'


const Togglable = ({ children }) => {
  const [visible , setVisible ] = useState(false)
  return (<div className="container">
    { visible && children}
    <button data-test="show-form-blog" onClick={() => setVisible(state => !state)}>{visible ? 'cancel' : 'create blog' }</button>
  </div>)

}


export default Togglable