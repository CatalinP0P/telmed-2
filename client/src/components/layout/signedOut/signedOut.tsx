import { useAuth } from 'context/AuthContext'
import React from 'react'

interface signedOutProps {
  children: React.ReactNode
}

export default function SignedOut({ children }: signedOutProps) {
  const { currentUser } = useAuth()

  if (currentUser != null) return <></>

  return <>{children}</>
}
