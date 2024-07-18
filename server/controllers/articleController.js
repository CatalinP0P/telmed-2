import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getFromCategory = async (categoryId) => {
  const news = await prisma.newsArticle.findMany({
    where: {
      categoryId: parseInt(categoryId),
    },
  })
  return news
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
      where: { AND: { ...query.where.AND, title: { contains: words[i] } } },
    }
  }

  const articles = await prisma.newsArticle.findMany(query)

  return articles
}

export const create = async (
  userId,
  categoryId,
  title,
  text,
  imageURL = null,
  videoURL = null,
  audioURL = null,
) => {
  const response = await prisma.newsArticle.create({
    data: {
      userId,
      categoryId: parseInt(categoryId),
      title,
      text,
      imageURL,
      videoURL,
      audioURL,
    },
  })

  return response
}

export default {
  getFromCategory,
  getByText,
  create,
}
