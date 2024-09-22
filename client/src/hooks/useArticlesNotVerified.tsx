import { useEffect, useState } from 'react'
import articleService from 'services/articleService'

export default function useArticlesNotVerified() {
  const [loading, setLoading] = useState(true)

  // eslint-disable-next-line
  const [data, setData] = useState<any>()

  const fetchData = async () => {
    const response = await articleService.getNotVerified()
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { loading, data }
}
