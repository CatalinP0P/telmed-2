import express from 'express'
import firebaseAuthorization from '../middlewares/authorization.js'
import articleController from '../controllers/articleController.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

const router = express.Router()

router.get('/q/:q', async (req, res) => {
  const { q } = req.params

  try {
    const articles = await articleController.getByText(q)
    res.json(articles)
  } catch {
    res.sendStatus(400)
  }
})

router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params
  try {
    const response = await articleController.getFromCategory(categoryId)
    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

router.post(
  '/',
  firebaseAuthorization,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  async (req, res) => {
    const { user } = req
    const { title, text, categoryId } = req.body

    const image = req.files['image'] ? req.files['image'][0].path : null
    const video = req.files['video'] ? req.files['video'][0].path : null
    const audio = req.files['audio'] ? req.files['audio'][0].path : null

    console.log('IMAGE', image)
    console.log('VIDEO', video)
    console.log('AUDIO', audio)

    try {
      const response = await articleController.create(
        user.uid,
        categoryId,
        title,
        text,
        image,
        video,
        audio,
      )

      res.json(response)
    } catch {
      res.sendStatus(400)
    }
  },
)

export default router
