import { api } from 'utils/api'

const getAll = async () => {
  const response = await api.get('/category/all')
  return response.data
}

const get = async (id: number) => {
  const response = await api.get(`/category/${id}`)
  return response.data
}

const add = async (title: string, description: string, dieseases: string) => {
  const response = await api.post('/category', {
    title,
    description,
    dieseases,
  })
  return response.data
}

const remove = async (id: string) => {
  const response = await api.delete(`/category/${id}`)
  return response.data
}

export default {
  getAll,
  get,
  add,
  remove,
}
