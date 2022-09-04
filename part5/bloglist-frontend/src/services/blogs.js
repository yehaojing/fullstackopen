import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const postNewBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const getRequest = await axios.get(`${baseUrl}/${blog.id}`, config)
  const updatedBlog = getRequest.data

  if (updatedBlog.likes) {
    updatedBlog.likes++
  } else {
    updatedBlog.likes = 1
  }

  const updateLikesRequest = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config)

  return updateLikesRequest
}

const deleteBlog = (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const deleteRequest = axios.delete(`${baseUrl}/${blog.id}`, config)

  return deleteRequest.then(response => response.data)
}

const exportedObject = {
  setToken,
  getAll,
  postNewBlog,
  likeBlog,
  deleteBlog
}

export default exportedObject