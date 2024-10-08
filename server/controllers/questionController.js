import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAll = async () => {
  const questions = await prisma.question.findMany({})
  return questions
}

export const getById = async (id) => {
  const question = await prisma.question.findFirst({
    where: { id: parseInt(id) },
  })

  return question
}

export const getByCategory = async (categoryId) => {
  const questions = await prisma.question.findMany({
    where: {
      categoryId: parseInt(categoryId),
    },
  })

  return questions
}

export const getByText = async (q) => {
  let query = {
    where: {
      AND: {},
    },
  }

  const words = q.split(' ')
  for (var i = 0; i < words.length; i++) {
    query = {
      ...query,
      where: { AND: { ...query.where.AND, text: { contains: words[i] } } },
    }
  }

  const questions = await prisma.question.findMany(query)

  return questions
}

export const add = async (userId, categoryId, text) => {
  const response = await prisma.question.create({
    data: { userId, categoryId: parseInt(categoryId), text },
  })

  return response
}

const removeAllQuestionsFromUser = async (userId) => {
  const response = await prisma.question.deleteMany({ where: { userId } })
  return response
}

const getQuestionsFromUser = async (userId) => {
  const response = await prisma.question.findMany({
    where: {
      userId,
    },
  })

  return response
}

const update = async (id, data) => {
  const response = await prisma.question.updateMany({
    where: { id: parseInt(id) },
    data,
  })
  return response
}

export default {
  getAll,
  getById,
  getByText,
  getByCategory,
  add,
  removeAllQuestionsFromUser,
  getQuestionsFromUser,
  update,
}
