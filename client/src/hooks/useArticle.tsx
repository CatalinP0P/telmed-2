import { useEffect, useState } from 'react'
import articleService from 'services/articleService'

export default function useArticle(id: number) {
  const [loading, setLoading] = useState(true)

  // eslint-disable-next-line
  const [data, setData] = useState<any>()

  const fetchData = async () => {
    const response = await articleService.getById(id)
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { loading, data }
}
