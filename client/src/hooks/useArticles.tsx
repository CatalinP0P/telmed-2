import { useEffect, useState } from 'react'
import articleService from 'services/articleService'

export default function useArticles(categoryId: string | number) {
  const [loading, setLoading] = useState(true)

  // eslint-disable-next-line
  const [data, setData] = useState<any>()

  const fetchData = async () => {
    const response = await articleService.getFromCategory(categoryId)

    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { loading, data }
}
