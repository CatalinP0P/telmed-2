import React from 'react'
import { useAuth } from 'context/AuthContext'

interface isMedicProps {
  children?: React.ReactNode
}

export default function IsMedic({ children }: isMedicProps) {
  const { isMedic, loading } = useAuth()

  if (loading || !isMedic) return <></>

  return <>{children}</>
}
