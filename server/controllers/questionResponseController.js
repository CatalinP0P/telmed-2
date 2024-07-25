import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getFromQuestion = async (questionId) => {
  const response = await prisma.questionResponse.findMany({
    where: { questionId: parseInt(questionId) },
  })

  return response
}

const create = async (userId, questionId, text) => {
  const response = await prisma.questionResponse.create({
    data: { userId, questionId: parseInt(questionId), text },
  })

  return response
}

const removeAllFromUser = async (userId) => {
  const response = await prisma.questionResponse.deleteMany({
    where: {
      userId,
    },
  })

  return response
}

const removeAllFromQuestion = async (questionId) => {
  const response = await prisma.questionResponse.deleteMany({
    where: {
      questionId,
    },
  })

  return response
}

export default {
  getFromQuestion,
  create,
  removeAllFromUser,
  removeAllFromQuestion,
}
