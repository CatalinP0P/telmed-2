import React from 'react'
import AdminNav from '../adminNav/adminNav'
import { useAuth } from 'context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './adminPageLayout.Module.scss'

interface adminPageLayoutProps {
  children?: React.ReactNode
}

export default function AdminPageLayout({ children }: adminPageLayoutProps) {
  const { isAdmin, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) return <></>

  if (!isAdmin) navigate('/admin/login')

  return (
    <div className="adminPageLayout">
      <AdminNav />
      <div className="adminPageLayout__body">{children}</div>
    </div>
  )
}
