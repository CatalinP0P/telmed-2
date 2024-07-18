import { api, getAuthorizedApi } from 'utils/api'

export interface createMedicAccountProps {
  name: string
  unit: string
  phoneNumber: string
  website: string
  location: string
}

const isMedic = async (authToken: string) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.get('/medic')
  return response.data
}

const getAll = async () => {
  const response = await api.get('/medic/all')
  return response.data
}

const getFromId = async (id: string) => {
  const response = await api.get('/medic/' + id)
  return response.data
}

export const createMedicAccount = async (
  authToken: string,
  data: createMedicAccountProps,
) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/medic/', data)
  return response.data
}

export const getFromCategory = async (category: string) => {
  const response = await api.get('/medic/category/' + category)
  return response.data
}

//eslint-disable-next-line
export const updateData = async (authToken: string, data: any) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/medic/update', data)
  return response.data
}

export const addReview = async (
  authToken: string,
  medicId: string,
  rating: number,
  text: string,
) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/medic/review/' + medicId, { rating, text })
  return response.data
}

export default {
  getAll,
  getFromId,
  createMedicAccount,
  getFromCategory,
  isMedic,
  addReview,
  updateData,
}
