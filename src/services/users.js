import axios from 'axios'

const url_api = 'http://localhost:3001/api'

 
const create =  async ({username , password})=> {
  
    const response =   await  axios.post(`${url_api}/login`, {username, password})
    
          return response 
     
    
    
}

const decodeToken = async (token) => { 
  try{
    const response = await axios.get(`${url_api}/users/name`, { params : {token }} )
    
    return response.data
  }
  catch(error){

  }

}


export default  { create ,decodeToken}