import React from 'react'
import AdminPageLayout from '../components/adminPageLayout/adminPageLayout'
import AdminCard from '../components/adminCard/adminCard'
import useUsers from 'hooks/useUsers'
import './users.Module.scss'
import userService from 'services/userService'
import { useAuth } from 'context/AuthContext'
import AddUser from './components/addUser/addUser'
import { api } from 'utils/api'

export default function AdminUsers() {
  const { data: users } = useUsers()
  const { currentUser } = useAuth()

  const deleteUser = async (userId: string) => {
    await api.delete('/admin/deleteAccount/' + userId)
    window.location.reload()
  }

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
                <button
                  className="table__button table__button--delete"
                  onClick={() => deleteUser(user.uid)}
                >
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
      <AdminCard title="Adauga Utilizator">
        <AddUser />
      </AdminCard>
    </AdminPageLayout>
  )
}
