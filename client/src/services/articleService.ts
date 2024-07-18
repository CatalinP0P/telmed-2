import { api } from 'utils/api'

const getFromCategory = async (categoryId: string | number) => {
  const response = await api.get('/article/' + categoryId)
  return response.data
}

//eslint-disable-next-line
const create = async (authToken: string, data: any) => {
  const response = await api.post('/article', data)
  return response.data
}

const getByQ = async (q: string) => {
  const response = await api.get('/article/q/' + q)
  return response.data
}

export default {
  getFromCategory,
  getByQ,
  create,
}
