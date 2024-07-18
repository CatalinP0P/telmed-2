import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const isBlocked = async (userId) => {
  const blocked =
    (await prisma.userBlocked.findFirst({ where: { userId } })) != null
      ? true
      : false

  return blocked
}

const toggleBlocked = async (userId) => {
  const blocked = await isBlocked(userId)

  if (blocked) await prisma.userBlocked.delete({ where: { userId } })
  else await prisma.userBlocked.create({ data: { userId } })

  return !blocked
}

export default {
  isBlocked,
  toggleBlocked,
}
