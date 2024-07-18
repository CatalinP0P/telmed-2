import React from 'react'
import AdminPageLayout from '../components/adminPageLayout/adminPageLayout'
import { useAuth } from 'context/AuthContext'
import './home.Module.scss'

export default function AdminHome() {
  const { currentUser } = useAuth()
  return (
    <AdminPageLayout>
      <label className="adminHome__title">
        Asta este pagina de admin: {currentUser?.email}
      </label>
    </AdminPageLayout>
  )
}
