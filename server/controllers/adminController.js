import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAll = async () => {
  return await prisma.admin.findMany({})
}

export const isAdmin = async (userId) => {
  const response = await prisma.admin.findFirst({ where: { userId } })
  return response == null ? false : true
}

export const add = async (userId) => {
  const response = await prisma.admin.create({ data: { userId } })
  return response
}

export const remove = async (userId) => {
  const response = await prisma.admin.delete({
    where: { id: parseInt(userId) },
  })
  return response
}

export default {
  getAll,
  isAdmin,
  add,
  remove,
}
