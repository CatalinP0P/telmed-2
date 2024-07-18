import { useEffect, useState } from 'react'
import medicService from 'services/medicService'

export default function useMedicById(id: string) {
  // eslint-disable-next-line
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const medic = await medicService.getFromId(id)
    console.log(medic)
    setData(medic)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return { data, loading }
}
