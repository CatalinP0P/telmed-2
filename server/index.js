import express from 'express'
import path from 'path'
import cors from 'cors'

import { config } from 'dotenv'
config()

import { fileURLToPath } from 'url'
import { dirname } from 'path'

import userRouter from './routes/userRouter.js'
import medicRouter from './routes/medicRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import adminRouter from './routes/adminRouter.js'
import questionRouter from './routes/questionRouter.js'
import articleRouter from './routes/articleRouter.js'
import formRouter from './routes/formRouter.js'
import userBlockedRouter from './routes/userBlockedRouter.js'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// ENV Setup
const __dirname = dirname(fileURLToPath(import.meta.url))
// const envPath = resolve(__dirname, '../.env')
// config({ path: envPath })

const PORT = process.env.SERVER_PORT

// Express Setup
const app = express()
app.use(cors())
app.use(express.json())

import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: Infinity,
  },
})

// Routes
app.use('/users', userRouter)
app.use('/medic', medicRouter)
app.use('/category', categoryRouter)
app.use('/admin', adminRouter)
app.use('/question', questionRouter)
app.use('/article', articleRouter)
app.use('/form', formRouter)
app.use('/userBlocked', userBlockedRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.post('/test', upload.single('audio'), async (req, res) => {
  // const audio = req.files['audio'] ? req.files['audio'][0].path : null
  const file = req.file

  console.log(file)
  res.json(file)
})

app.delete('/accounts', async (req, res) => {
  await prisma.medic.deleteMany({ where: {} })
  await prisma.medicReview.deleteMany({ where: {} })
  await prisma.question.deleteMany({ where: {} })
  await prisma.questionResponse.deleteMany({ where: {} })

  res.json('REMOVED ALL ACCOUNTS')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
