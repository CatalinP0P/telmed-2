import express from 'express'
import medicController from '../controllers/medicController.js'
import authorization from '../middlewares/authorization.js'
import userController from '../controllers/userController.js'
import firebaseAuthorization from '../middlewares/authorization.js'
import MedicReviewController from '../controllers/MedicReviewController.js'

const router = express.Router()

router.get('/', firebaseAuthorization, async (req, res) => {
  const user = req.user
  try {
    const response = await medicController.getByUserId(user.uid)
    const isMedic = response != null ? true : false

    res.json(isMedic)
  } catch {
    res.sendStatus(400)
  }
})

router.post('/update', firebaseAuthorization, async (req, res) => {
  const user = req.user
  const response = await medicController.getByUserId(user.uid)
  const isMedic = response != null ? true : false

  if (!isMedic) return res.sendStatus(403)

  try {
    const x = await medicController.updateData(user.uid, {
      ...req.body,
      categoriesJSON: JSON.stringify(req.body.categoriesJSON),
    })

    res.json(x)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/all', async (req, res) => {
  try {
    const all = await medicController.getAll()

    for (var i = 0; i < all.length; i++) {
      try {
        const user = await userController.getById(all[i].userId)

        all[i] = {
          ...all[i],
          user: user,
        }
      } catch {
        delete all[i]
      }

      delete all[i].userId
    }

    res.json(all)
  } catch {
    res.sendStatus(400)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const medic = await medicController.getByUserId(id)
    res.json(medic)
  } catch {
    res.sendStatus(400)
  }
})

router.post('/', authorization, async (req, res) => {
  let body = req.body

  if (body.categoriesJSON) {
    body = {
      ...body,
      userId: req.user.uid,
      categoriesJSON: JSON.stringify(body.categoriesJSON),
    }
  }

  try {
    const response = await medicController.create(body)
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.get('/category/:category', async (req, res) => {
  const { category } = req.params

  try {
    const response = await medicController.getFromCategory(category)
    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    res.json(await medicController.remove(id))
  } catch {
    res.sendStatus(400)
  }
})

router.post('/verify/:medicId', firebaseAuthorization, async (req, res) => {
  const { medicId } = req.params

  try {
    const response = await medicController.toggleVerified(medicId)
    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

router.post('/review/:medicId', firebaseAuthorization, async (req, res) => {
  const user = req.user
  const { medicId } = req.params
  const { rating, text } = req.body

  try {
    const response = await MedicReviewController.create(
      user.uid,
      medicId,
      rating,
      text,
    )

    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

export default router
