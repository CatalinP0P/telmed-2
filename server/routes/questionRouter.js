import express from 'express'
import questionController from '../controllers/questionController.js'
import questionResponseController from '../controllers/questionResponseController.js'
import firebaseAuthorization from '../middlewares/authorization.js'
import userController from '../controllers/userController.js'
import categoryController from '../controllers/categoryController.js'
import medicReviewController from '../controllers/MedicReviewController.js'

const router = express.Router()

router.get('/allcategories', async (req, res) => {
  try {
    let categories = await categoryController.getAll()
    for (var i = 0; i < categories.length; i++) {
      const questions = await questionController.getByCategory(categories[i].id)
      categories[i] = { ...categories[i], questions }
    }

    res.json(categories)
  } catch {
    res.sendStatus(400)
  }
})

router.get('/:q', async (req, res) => {
  const { q } = req.params

  try {
    const questions = await questionController.getByText(q)
    res.json(questions)
  } catch {
    res.sendStatus(400)
  }
})

router.get('/id/:id', async (req, res) => {
  const { id } = req.params

  try {
    let question = await questionController.getById(id)
    const responses = await questionResponseController.getFromQuestion(id)
    const user = await userController.getById(question.userId)

    question = { ...question, user }

    for (var i = 0; i < responses.length; i++) {
      const user = await userController.getById(responses[i].userId)
      responses[i] = { ...responses[i], user }
    }

    res.json({ ...question, responses })
  } catch {
    res.sendStatus(400)
  }
})

router.get('/category/:id', async (req, res) => {
  const { id } = req.params

  try {
    let questions = await questionController.getByCategory(id)
    for (var i = 0; i < questions.length; i++) {
      const user = await userController.getById(questions[i].userId)
      const responses = await questionResponseController.getFromQuestion(
        questions[i].id,
      )
      console.log(responses)

      for (var y = 0; y < responses.length; y++) {
        const user = await userController.getById(responses[y].userId)
        const userReviews = await medicReviewController.getMedicReviews(
          user.uid,
        )
        responses[y] = { ...responses[y], user, userReviews }
        delete responses[y].userId
      }

      questions[i] = { ...questions[i], user, responses }
      delete questions[i].userId
    }
    res.json(questions)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

router.post('/', firebaseAuthorization, async (req, res) => {
  const { categoryId, text } = req.body
  const { uid: userId } = req.user

  try {
    const response = await questionController.add(userId, categoryId, text)
    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

router.post('/respond/:id', firebaseAuthorization, async (req, res) => {
  const user = req.user
  const { id } = req.params
  const { text } = req.body

  try {
    const response = await questionResponseController.create(user.uid, id, text)
    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

export default router
