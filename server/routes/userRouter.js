import express from 'express'
import userController from '../controllers/userController.js'
import userBlockedController from '../controllers/userBlockedController.js'

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const users = await userController.getAll()

    for (var i = 0; i < users.length; i++) {
      const blocked = await userBlockedController.isBlocked(users[i].uid)
      users[i] = { ...users[i], blocked }
      console.log(blocked)
    }

    res.json(users)
  } catch {
    res.sendStatus(400)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await userController.getById(id)
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})

export default router
