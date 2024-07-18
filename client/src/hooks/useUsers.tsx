import { useEffect, useState } from 'react'
import userService from 'services/userService'

export default function useUsers() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const users = await userService.getAll()
    console.log(users)
    setData(users)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
