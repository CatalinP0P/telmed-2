import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAll = async () => {
  const categories = await prisma.category.findMany({})
  return categories
}

export const getById = async (id) => {
  const category = await prisma.category.findFirst({ where: { id } })
  return category
}

export const add = async (title, description, dieseases) => {
  const response = await prisma.category.create({
    data: { title, description, dieseases },
  })
  return response
}

export const remove = async (id) => {
  const response = await prisma.category.delete({ where: { id } })
  return response
}

export default {
  getAll,
  getById,
  add,
  remove,
}
