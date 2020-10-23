import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  let response
  try{
    response = await axios({
    method: 'POST',
    url : baseUrl,
    headers : {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data : blog
  } )
  return response 

}
  
  catch(error){
    return error.response
  }


}

export default { getAll ,create }