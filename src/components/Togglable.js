import React, { useState } from 'react'


const Togglable = ({children}) => {
    const [visible , setVisible ] = useState(false)
    return (<div>
        { visible && children}
        <button onClick={() => setVisible(state => !state)}>{visible ? 'cancel' : 'log in' }</button>
    </div>)

}


export default Togglable