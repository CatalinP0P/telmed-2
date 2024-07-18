import { useEffect, useState } from 'react'
import questionService from 'services/questionService'

export default function useQuestions(categoryId: number) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const questions = await questionService.getFromCategory(categoryId)
    setData(questions)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
