import { useAuth } from 'context/AuthContext'
import React from 'react'

interface signedInProps {
  children: React.ReactNode
}

export default function SignedIn({ children }: signedInProps) {
  const { currentUser, loading } = useAuth()

  if (loading) return <></>
  if (currentUser == null) return <></>

  return <>{children}</>
}
