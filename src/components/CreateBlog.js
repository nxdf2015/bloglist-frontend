import React from 'react'

import Togglable from './Togglable'
import FormBlog from './FormBlog'

const CreateBlog = (props) => {

  return     (<Togglable>{
    (visible,toogleVisibility)  => visible && <FormBlog {...props} toogleVisibility={toogleVisibility}/>}
  </Togglable>)
}



export default CreateBlog