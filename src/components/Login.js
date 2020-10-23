import React, {   useState, useEffect } from "react";

import usersService from "../services/users";
 

const Login = ({getState}) => {
  const [user, setUser] = useState({username:"",password:""});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        setToken(token);
        const { username } = await usersService.decodeToken(token);
        setUser({ username });
        
      }
    };
    getToken();
  }, []);

  const handlerLog = ({ target }) => {
    setUser((user) => ({ ...user, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const response = await usersService.create(user);
    if (response.status  === 200) {
      const token = response.data.token
      setToken(token);
      getState(true,{status : 200})
      localStorage.setItem("token", token);
    }
    else {
      getState(false , response )
    }

    setUser((user) => ({ ...user, password: "" }));
  };

  const logout = () => {
    setToken(null);
    getState(false,{status : 200})
    localStorage.removeItem("token");
  };

  

  return <div>
      {token == null ? 
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
  
};

export default Login;
