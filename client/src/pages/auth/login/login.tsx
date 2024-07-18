import { Button, TextField } from '@mui/material'
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.Module.scss'
import { toast } from 'react-toastify'
import { useAuth } from 'context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { signInWithEmail } = useAuth()

  const handleLogin: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent,
  ) => {
    e.preventDefault()

    try {
      const response = await signInWithEmail(email, password)

      console.log(response)

      //eslint-disable-next-line
    } catch (err: any) {
      toast.error(err.errors ? err.errors[0].message : 'Sign-in failed')
    }
  }
  return (
    <div className="login">
      <div className="login__card">
        <h2 className="login__title">Conecteaza-te</h2>
        <form className="login__form" onSubmit={handleLogin}>
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
          <div className="login__info">
            <label className="info__item">
              Nu ai cont?{' '}
              <span onClick={() => navigate('/auth/register')}>
                Creare Cont
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}
