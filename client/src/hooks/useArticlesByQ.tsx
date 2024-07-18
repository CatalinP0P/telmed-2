import { useEffect, useState } from 'react'
import articleService from '../services/articleService'

export default function useArticlesByQ(q: string) {
  const [loading, setLoading] = useState(true)

  // eslint-disable-next-line
  const [data, setData] = useState<any>()

  const fetchData = async () => {
    const response = await articleService.getByQ(q)

    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [q])

  return { loading, data }
}
