import express from 'express'
import categoryController from '../controllers/categoryController.js'

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const categories = await categoryController.getAll()
    res.json(categories)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const category = await categoryController.getById(parseInt(id))
  res.json(category)
})

router.post('/', async (req, res) => {
  const { title, description, dieseases } = req.body
  try {
    const response = await categoryController.add(title, description, dieseases)
    res.json(response)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const response = await categoryController.remove(parseInt(id))
    res.json(response)
  } catch (err) {
    res.status(400).json(err)
  }
})

export default router
