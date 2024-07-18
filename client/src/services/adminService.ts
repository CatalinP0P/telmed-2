import { getAuthorizedApi } from 'utils/api'

export const isAdmin = async (authToken: string) => {
  const api = getAuthorizedApi(authToken)

  const response = await api.get('/admin')
  return response.data
}

const toggleVerifiedMedic = async (authToken: string, medicId: string) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/medic/verify/' + medicId)

  return response
}

export default {
  isAdmin,
  toggleVerifiedMedic,
}
