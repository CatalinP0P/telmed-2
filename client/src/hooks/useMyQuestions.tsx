import { useEffect, useState } from 'react'
import questionService from 'services/questionService'

export default function useMyQuestions(authToken: string) {
  //eslint-disable-next-line
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const questions = await questionService.getMyQuestions(authToken)
    setData(questions)
    setLoading(false)
  }

  useEffect(() => {
    if (authToken) fetchData()
  }, [authToken])

  return { data, loading }
}
