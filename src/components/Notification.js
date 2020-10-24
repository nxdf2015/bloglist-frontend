import React  from 'react'



const Notification = ({ message ,   type = 'success' }) =>  <div style={{ background : 'grey' ,  border: `4px solid ${type=== 'success' ? 'green' : 'red'}` }}>{message}</div>


export default Notification




