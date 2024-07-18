import React, { FormEvent, FormEventHandler, useState } from 'react'
import { Button, TextField } from '@mui/material'
import './register.Module.scss'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import app from 'utils/firebase'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRe, setPasswordRe] = useState('')
  const navigate = useNavigate()

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent,
  ) => {
    e.preventDefault()

    try {
      const auth = app.auth()
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password,
      )
      console.log(response)

      navigate('/')
      //eslint-disable-next-line
    } catch (err: any) {
      toast.error(err.errors ? err.errors[0].message : 'Sign-up failed')
    }
  }

  return (
    <div className="register">
      <div className="register__card">
        <h2 className="register__title">Creare cont</h2>
        <form className="register__form" onSubmit={handleSignUp}>
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
          <TextField
            label="Confirmare Parola"
            type="password"
            fullWidth
            size="small"
            value={passwordRe}
            onChange={(e) => setPasswordRe(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Creaza cont
          </Button>
          <div className="register__info">
            <label className="info__item">
              Ai deja un cont?{' '}
              <span onClick={() => navigate('/auth/login')}>Logare</span>
            </label>
            <label className="info__item">
              Esti un doctor?{' '}
              <span onClick={() => navigate('/auth/registerMedic')}>
                Creare cont doctor
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}
