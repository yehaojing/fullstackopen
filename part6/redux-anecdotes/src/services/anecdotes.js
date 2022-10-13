import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const payload = { content, votes: 0 }
  const response = await axios.post(baseUrl, payload)
  return response.data
}

const updateAnecdote = async (id, content) => {
  const response = await axios.put(`${baseUrl}/${id}`, content)
  return response.data
}

const exportObject = {
  getAll,
  createAnecdote,
  updateAnecdote
}

export default exportObject