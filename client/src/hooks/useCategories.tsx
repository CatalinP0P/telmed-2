import { useEffect, useState } from 'react'
import categoryService from 'services/categoryService'

export default function useCategories() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await categoryService.getAll()
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { loading, data }
}
