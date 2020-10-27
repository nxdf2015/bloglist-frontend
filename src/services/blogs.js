import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blog) => {
  const response = await axios({
    method: 'POST',
    url: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: blog,
  })
  return response
}

const updateLike = async (blog) => {
  const response = await axios({
    method: 'PATCH',
    url: baseUrl + '/' + blog.id + '/like',
    data: { blog, likes: blog.likes + 1 },
  })
  return response
}

const remove = async (blog) => {
  const response = await axios({
    method: 'DELETE',
    url: baseUrl + '/' +  blog.id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

export default { getAll, create, updateLike, remove }
