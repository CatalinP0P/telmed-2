import { useEffect, useState } from 'react'
import medicService from 'services/medicService'

export default function useMedic() {
  // eslint-disable-next-line
  const [data, setData] = useState<any[]>()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const medic = await medicService.getAll()
    console.log(medic)
    setData(medic)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
