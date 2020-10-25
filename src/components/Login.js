import React, { useState } from 'react'

const Login = ({ setLogin, setLogOut, isLogged }) => {
  const [user, setUser] = useState({ username: '', password: '' })

  const handlerLog = ({ target }) => {
    setUser((user) => ({ ...user, [target.name]: target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLogin(user)

    setUser((user) => ({ ...user, password: '' }))
  }



  const logout = () => {
    setLogOut()
  }

  return (
    <div>
      {isLogged ? (
        <>
          <span> {`${user.username} logged in`}</span>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <>
          <h2>Log in to application</h2>
          <form data-test="login-form" onSubmit={handleSubmit}>
            <div>
              <label>
                username
                <input
                  type="text"
                  name="username"
                  onChange={handlerLog}
                  value={user.username}
                />
              </label>
            </div>
            <div>
              <label>
                password
                <input
                  type="password"
                  name="password"
                  onChange={handlerLog}
                  value={user.password}
                  placeholder="password"
                />
              </label>
            </div>
            <div>
              <button type="submit">login</button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default Login
