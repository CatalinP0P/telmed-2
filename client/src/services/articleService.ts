import { api, getAuthorizedApi } from 'utils/api'

const getById = async (id: number) => {
  const response = await api.get('/article/id/' + id)
  return response.data
}

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

// eslint-disable-next-line
const update = async (authToken: string, id: string, data: any) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/article/' + id, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response
}

const getNotVerified = async () => {
  const response = await api.get('/article/notVerified')
  return response.data
}

export default {
  getById,
  getFromCategory,
  getByQ,
  create,
  update,
  getNotVerified,
}
