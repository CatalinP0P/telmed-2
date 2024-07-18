import { useEffect, useState } from 'react'
import questionService from 'services/questionService'

export default function useQuestionsByCategory() {
  const [loading, setLoading] = useState(true)

  // eslint-disable-next-line
  const [data, setData] = useState<any>()

  const fetchData = async () => {
    const response = await questionService.getByCategory()
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { loading, data }
}
