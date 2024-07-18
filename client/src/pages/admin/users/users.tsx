import React, { useEffect } from 'react'
import AdminPageLayout from '../components/adminPageLayout/adminPageLayout'
import AdminCard from '../components/adminCard/adminCard'
import useUsers from 'hooks/useUsers'
import './users.Module.scss'
import userService from 'services/userService'
import { useAuth } from 'context/AuthContext'

export default function AdminUsers() {
  const { data: users, loading } = useUsers()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (loading) return

    console.log(users)
  }, [loading])

  return (
    <AdminPageLayout>
      <AdminCard className="admin__users" title="Utilizatori">
        <div className="users__table">
          <div className="table__header">
            <label className="table__col table__col--1">#</label>
            <label className="table__col table__col--7">Email</label>
            <label className="table__col table__col--2">Sterge</label>
            <label className="table__col table__col--2">Blocheaza</label>
          </div>

          {/* eslint-disable-next-line */}
          {(users as any)?.map((user: any, key: number) => (
            <div className="table__row" key={user.uid}>
              <label className="table__col table__col--1">{key}</label>
              <label className="table__col table__col--7">{user.email}</label>
              <label className="table__col table__col--2">
                <button className="table__button table__button--delete">
                  Sterge
                </button>
              </label>
              <label className="table__col table__col--2">
                <button
                  className="table__button table__button--ban"
                  onClick={async () => {
                    const authToken =
                      (await currentUser?.getIdToken()) as string

                    await userService.toggleBlock(authToken, user.uid)
                    window.location.reload()
                  }}
                >
                  {user.blocked ? 'Deblocheaza' : 'Blocheaza'}
                </button>
              </label>
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminPageLayout>
  )
}
