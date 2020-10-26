import React from 'react'

const Notification = ({ message, type = 'success' }) => (
  <div data-test="notification"
    style={{
      background: 'white',
      border: `4px solid ${type === 'success' ? 'green' : 'red'}`,
      color :  type === 'success' ? 'green' : 'red'
    }}
  >
    {message}
  </div>
)

export default Notification
