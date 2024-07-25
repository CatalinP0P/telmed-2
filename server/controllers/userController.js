import admin from '../utils/firebase.js'
import MedicReviewController from './MedicReviewController.js'
import questionController from './questionController.js'
import questionResponseController from './questionResponseController.js'

const getAll = async () => {
  const users = await admin.auth().listUsers()
  return users.users
}

const getById = async (id) => {
  const user = await admin.auth().getUser(id)
  return user
}

const remove = async (userId) => {
  await admin.auth().deleteUser(userId)
  MedicReviewController.removeAllFromUser(userId)
  questionResponseController.removeAllFromUser(userId)
  questionController.removeAllQuestionsFromUser(userId)
}

export default {
  getAll,
  getById,
  remove,
}
