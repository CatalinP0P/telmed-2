import React, { FormEventHandler, useState } from 'react'
import './login.Module.scss'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import app from 'utils/firebase'
import adminService from 'services/adminService'
import { useAuth } from 'context/AuthContext'
import { toast } from 'react-toastify'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { isAdmin, loading } = useAuth()

  if (!loading && isAdmin) navigate('/admin')

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (email.trim() == '' || password.trim() == '') return

    try {
      const auth = app.auth()
      const response = await auth.signInWithEmailAndPassword(email, password)

      const isAdmin = await adminService.isAdmin(
        (await response.user?.getIdToken()) as string,
      )

      if (isAdmin) navigate('/admin')
      else {
        toast.error('Email sau Parola incorecta')
        setEmail('')
        setPassword('')
      }
    } catch {
      toast.error('Email sau Parola incorecta')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="adminLogin">
      <div className="adminLogin__card">
        <h2 className="adminLogin__title">Conecteaza-te ca Admin</h2>
        <form className="login__form" onSubmit={onSubmit}>
          <TextField
            label="Email"
            type="email"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Parola"
            type="password"
            size="small"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" type="submit">
            Intra in cont{' '}
          </Button>
        </form>
      </div>
    </div>
  )
}
