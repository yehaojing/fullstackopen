import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
      setValue(event.target.value)
  }

  return {
      type,
      value,
      onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const get = () => {
      axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }

  const create = (resource) => {
      axios
      .post(`${baseUrl}`, resource)
      .then(response => {
        setResources([...resources, response.data])
      })
  }

  const service = {
      get,
      create
  }

  return [
      resources, service
  ]
}