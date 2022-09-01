import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

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

const exportedObject = {
  setToken,
  getAll,
  postNewBlog
}

export default exportedObject