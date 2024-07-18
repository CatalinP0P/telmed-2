import { api, getAuthorizedApi } from 'utils/api'

export const getAll = async () => {
  const response = await api.get('/users/all')
  return response.data
}

export const isBlocked = async (authToken: string) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.get('/userBlocked')
  return response.data
}

export const toggleBlock = async (authToken: string, userId: string) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/userBlocked/' + userId)
  return response.data
}

export default {
  getAll,
  isBlocked,
  toggleBlock,
}
