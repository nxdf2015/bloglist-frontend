import React, {   useState, useEffect } from 'react'

import usersService from '../services/users'


const Login = ({ getState, handlerError }) => {
  const [user, setUser] = useState({ username:'',password:'' })
  const [token, setToken] = useState(null)

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem('token')

      if (token) {
        setToken(token)
        usersService.decodeToken(token)
          .then(response => setUser({ username : response.data.username }))
          //.catch(error => handlerError({ data: error.data , message : 'invalid token' }))

      }
    }
    getToken()
  }, [])

  const handlerLog = ({ target }) => {
    setUser((user) => ({ ...user, [target.name]: target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let response
    try {
      response =  await  usersService.create(user)


      const token = response.data.token
      setToken(token)
      getState(true,{ status : 200 })
      localStorage.setItem('token', token)
    }
    catch(error) {

      handlerError({ ...error,message:'wrong username or password' })
    }

    setUser((user) => ({ ...user, password: '' }))
  }

  const logout = () => {
    setToken(null)
    getState(false,{ status : 200 })
    localStorage.removeItem('token')
  }



  return <div>
    {token === null ?
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
      :
      <>
        <span> {`${user.username} logged in`}</span>
        <button onClick={logout}>logout</button>
      </>
    }


  </div>

}

export default Login
