import { useEffect, useState } from 'react'
import questionService from 'services/questionService'

export default function useQuestionsByQ(q: string) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const questions = await questionService.getByQ(q)
    setData(questions)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [q])

  return { data, loading }
}
