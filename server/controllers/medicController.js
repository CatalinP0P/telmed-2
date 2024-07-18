import userController from './userController.js'
import MedicReviewController from './MedicReviewController.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAll = async () => {
  let medics = await prisma.medic.findMany({})

  for (var i = 0; i < medics.length; i++) {
    const reviews = await MedicReviewController.getMedicReviews(
      medics[i].userId,
    )
    console.log(reviews)
    medics[i] = { ...medics[i], reviews }
  }

  return medics.map((medic) => {
    return { ...medic, categoriesJSON: JSON.parse(medic.categoriesJSON) }
  })
}

export const getByUserId = async (userId) => {
  let medic = await prisma.medic.findFirst({ where: { userId } })
  if (medic == null) return null
  const reviews = await MedicReviewController.getMedicReviews(medic.userId)
  medic = { ...medic, reviews }
  medic = { ...medic, categoriesJSON: JSON.parse(medic.categoriesJSON) }
  return medic
}

export const create = async (data) => {
  const response = await prisma.medic.create({ data })
  return response
}

export const remove = async (userId) => {
  const response = await prisma.medic.delete({ where: { userId } })
  return response
}

export const toggleVerified = async (userId) => {
  const medic = await getByUserId(userId)

  const response = await prisma.medic.update({
    where: {
      userId,
    },
    data: { verified: !medic.verified },
  })

  return !response.verified
}

export const getFromCategory = async (category) => {
  const medic = await getAll()

  var good = []

  for (var i = 0; i < medic.length; i++) {
    if (
      medic[i].categoriesJSON.filter(
        (m) => m.toLowerCase() == category.toLowerCase(),
      ).length > 0
    ) {
      const user = await userController.getById(medic[i].userId)
      medic[i].userId.delete
      good.push({ ...medic[i], user })
    }
  }

  return good
}

export const updateData = async (userId, data) => {
  return await prisma.medic.update({ where: { userId: userId }, data })
}

export default {
  getAll,
  getByUserId,
  getFromCategory,
  toggleVerified,
  create,
  remove,
  updateData,
}
