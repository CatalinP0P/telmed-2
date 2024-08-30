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

    const medicPromises = all.map(async (medic) => {
      try {
        const user = await userController.getById(medic.userId)

        return {
          ...medic,
          user,
        }
      } catch {
        // Returning null if an error occurs to filter out later
        return null
      }
    })

    // Wait for all promises to resolve
    let medicsWithUsers = await Promise.all(medicPromises)

    // Filter out any null results (due to errors in user fetching)
    medicsWithUsers = medicsWithUsers.filter((medic) => medic !== null)

    // Remove userId from the final result
    medicsWithUsers = medicsWithUsers.map((medic) => {
      //eslint-disable-next-line
      const { userId, ...rest } = medic
      return rest
    })

    res.json(medicsWithUsers)
  } catch (err) {
    console.error(err)
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
