import admin from '../utils/firebase.js'

const getAll = async () => {
  const users = await admin.auth().listUsers()
  return users.users
}

const getById = async (id) => {
  const user = await admin.auth().getUser(id)
  return user
}

export default {
  getAll,
  getById,
}
