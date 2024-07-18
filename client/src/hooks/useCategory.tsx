import { useEffect, useState } from 'react'
import categoryService from 'services/categoryService'

export default function useCategory(id: number) {
  const [loading, setLoading] = useState(true)

  // eslint-disable-next-line
  const [data, setData] = useState<any>()

  const fetchData = async () => {
    const response = await categoryService.get(id)

    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { loading, data }
}
