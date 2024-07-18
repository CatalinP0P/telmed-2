import { useEffect, useState } from 'react'
import questionService from 'services/questionService'

export default function useQuestion(questionId: number) {
  //eslint-disable-next-line
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const question = await questionService.getById(questionId)
    setData(question)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [questionId])

  return { data, loading }
}
