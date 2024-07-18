import express from 'express'
import firebaseAuthorization from '../middlewares/authorization.js'
import userBlockedController from '../controllers/userBlockedController.js'

const router = express.Router()

router.get('/', firebaseAuthorization, async (req, res) => {
  const { user } = req
  try {
    const blocked = await userBlockedController.isBlocked(user.uid)
    res.json(blocked)
  } catch {
    res.sendStatus(400)
  }
})

router.post('/:userId', firebaseAuthorization, async (req, res) => {
  const { userId } = req.params
  try {
    const blocked = await userBlockedController.toggleBlocked(userId)
    res.json(blocked)
  } catch {
    res.sendStatus(400)
  }
})

export default router
