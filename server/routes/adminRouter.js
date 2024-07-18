import express from 'express'
import firebaseAuthorization from '../middlewares/authorization.js'
import adminController from '../controllers/adminController.js'

const router = express.Router()

router.get('/', firebaseAuthorization, async (req, res) => {
  const id = req.user.uid
  return res.json(await adminController.isAdmin(id))
})

router.get('/all', async (req, res) => {
  const admins = await adminController.getAll()
  res.json(admins)
})

router.post('/add/:id', async (req, res) => {
  const { id } = req.params
  return res.json(await adminController.add(id))
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const response = await adminController.remove(id)
    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

export default router
