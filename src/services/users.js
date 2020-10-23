import axios from 'axios'

const url_api = 'http://localhost:3001/api'

 
const create = async ({username , password})=> {
    try{ 
    const response = await  axios.post(`${url_api}/login`, {username, password})
    
          return response 
    }
    catch(error){
      console.log(error)
         return error.response
    }
    
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