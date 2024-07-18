import { useEffect, useState } from 'react'
import medicService from 'services/medicService'

export default function useMedicFromCategory(category: string) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const medic = await medicService.getFromCategory(category)
    setData(medic)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
