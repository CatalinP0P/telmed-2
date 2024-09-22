import useMedic from 'hooks/useMedic'
import React from 'react'
import AdminPageLayout from '../components/adminPageLayout/adminPageLayout'
import AdminCard from '../components/adminCard/adminCard'
import './medic.Module.scss'
import { Check, Close, Edit } from '@mui/icons-material'
import adminService from 'services/adminService'
import { useAuth } from 'context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminMedic() {
  const { data: medic } = useMedic()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const toggleVerified = async (medicId: string) => {
    const authToken = (await currentUser?.getIdToken()) as string

    await adminService.toggleVerifiedMedic(authToken, medicId)
    window.location.reload()
  }

  return (
    <AdminPageLayout>
      <AdminCard className="admin__medic" title="Medici">
        <div className="medic__table">
          <div className="table__header">
            <label className="table__col table__col--1">#</label>
            <label className="table__col table__col--5">Email</label>
            <label className="table__col table__col--2">Nume</label>
            <label className="table__col table__col--2">Verificat</label>
            <label className="table__col table__col--2">Verifica</label>
            <label className="table__col table__col--1">Edit</label>
          </div>

          {/* eslint-disable-next-line */}
          {(medic as any)?.map((medic: any, key: number) => (
            <div className="table__row" key={medic.user.uid}>
              <label className="table__col table__col--1">{key}</label>
              <label className="table__col table__col--5 table__col--email">
                <label
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/medic/' + medic.user.uid)}
                >
                  {medic.user.email}
                </label>
              </label>
              <label className="table__col table__col--2">{medic.name}</label>
              <label className="table__col table__col--2">
                {medic.verified ? <Check /> : <Close />}
              </label>
              <label className="table__col table__col--2">
                {medic.verified ? (
                  <button
                    className="table__button table__button--remove"
                    onClick={() => toggleVerified(medic.user.uid)}
                  >
                    Scoate verificarea
                  </button>
                ) : (
                  <button
                    className="table__button table__button--add"
                    onClick={() => toggleVerified(medic.user.uid)}
                  >
                    Verifica
                  </button>
                )}
              </label>
              <label className="table__col table__col--1">
                <div
                  className="table__col--edit"
                  onClick={() =>
                    navigate('/admin/medic/edit/' + medic.user.uid)
                  }
                >
                  <Edit color="inherit" />
                </div>
              </label>
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminPageLayout>
  )
}
