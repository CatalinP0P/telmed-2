import { api, getAuthorizedApi } from 'utils/api'

const getFromCategory = async (categoryId: number) => {
  const response = await api.get('/question/category/' + categoryId)
  return response.data
}

const getByCategory = async () => {
  const response = await api.get('/question/allcategories')
  return response.data
}

const getByQ = async (q: string) => {
  const questions = await api.get('/question/' + q)
  return questions.data
}

const getById = async (id: number) => {
  const question = await api.get('/question/id/' + id)
  return question.data
}

const add = async (authToken: string, categoryId: string, text: string) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/question', { categoryId, text })
  return response.data
}

const addResponse = async (
  authToken: string,
  questionId: number,
  text: string,
) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/question/respond/' + questionId, { text })
  return response.data
}

export default {
  getFromCategory,
  getByCategory,
  getByQ,
  getById,
  add,
  addResponse,
}
