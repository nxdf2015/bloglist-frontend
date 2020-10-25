import React, {   useState, useEffect } from 'react'

import usersService from '../services/users'


const Login = ({ handlerLogin }) => {
  const [user, setUser] = useState({ username:'',password:'' })
  const [isLog, setLogStatus ] = useState(false)

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem('token')

      if (token) {
        // setToken(token)
        usersService.decodeToken(token)
          .then(response =>
            setUser({ username : response.data.username }))
        setLogStatus(true)}
      // .catch(error => handlerError({ data: error.data , message : 'invalid token' }))


    }
    getToken()
  }, [])

  const handlerLog = ({ target }) => {
    setUser((user) => ({ ...user, [target.name]: target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLogStatus(handlerLogin({ user  }))
    setUser((user) => ({ ...user, password: ' ' }))

  }

  const logout = () => {
    localStorage.removeItem('token')
    handlerLogin({ user : null })
    setLogStatus(false)
  }



  return <div>
    {isLog === null ?
      <>
        <span> {`${user.username} logged in`}</span>
        <button onClick={logout}>logout</button>
      </>:
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
                username
              <input type="text"
                name="username"
                onChange={handlerLog}
                value={user.username}

              />
            </label>
          </div>
          <div>
            <label>
                password
              <input type="password"
                name="password"
                onChange={handlerLog}
                value={user.password}
                placeholder="password"
              />
            </label>
          </div>
          <div>
            <button type="submit" >login</button>
          </div>
        </form>
      </>


    }


  </div>

}

export default Login
