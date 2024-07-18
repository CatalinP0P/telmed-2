import { PrismaClient } from '@prisma/client'
import userController from '../controllers/userController.js'
const prisma = new PrismaClient()

export const getMedicReviews = async (medicId) => {
  let reviews = await prisma.medicReview.findMany({
    where: { medicId: medicId },
  })

  for (var i = 0; i < reviews.length; i++) {
    const user = await userController.getById(reviews[i].userId)
    delete reviews[i].userId
    delete reviews[i].medicId
    delete reviews[i].date

    reviews[i] = { ...reviews[i], user }
  }

  return reviews
}

export const create = async (userId, medicId, rating, text) => {
  const response = await prisma.medicReview.create({
    data: { userId, medicId, rating, text },
  })

  return response
}

export default {
  getMedicReviews,
  create,
}
