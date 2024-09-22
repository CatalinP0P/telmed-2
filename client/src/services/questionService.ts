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

const getMyQuestions = async (authToken: string) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.get('/question/myQuestions')
  return response.data
}

const getMyAnswers = async (authToken: string) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.get('/question/myAnswers')
  return response.data
}

const update = async (authToken: string, questionId: number, data: unknown) => {
  const api = getAuthorizedApi(authToken)
  const response = await api.post('/question/edit/' + questionId, data)
  return response.data
}

const getResponseById = async (responseId: string) => {
  const response = await api.get('/question/response/' + responseId)
  return response.data
}

export default {
  getFromCategory,
  getByCategory,
  getByQ,
  getById,
  add,
  addResponse,
  getMyQuestions,
  getMyAnswers,
  update,
  getResponseById,
}
