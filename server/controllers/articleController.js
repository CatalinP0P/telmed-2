import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getById = async (id) => {
  const article = await prisma.newsArticle.findFirst({
    where: { id: parseInt(id) },
  })
  return article
}

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

export const update = async (id, data) => {
  var body = { ...data }
  if (data.confirmed != null) {
    body = { ...body, confirmed: data.confirmed == 'true' }
  }

  const response = await prisma.newsArticle.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...body,
    },
  })

  return response
}

export const getNotVerified = async () => {
  const response = await prisma.newsArticle.findMany({
    where: {
      confirmed: false,
    },
  })

  return response
}

export default {
  getById,
  getFromCategory,
  getByText,
  create,
  update,
  getNotVerified,
}
