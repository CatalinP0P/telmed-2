import React, { FormEventHandler, useState } from 'react'
import './addUser.Module.scss'
import { Button, Checkbox, TextField } from '@mui/material'
import { api } from 'utils/api'

export default function AddUser() {
  const [addEmail, setAddEmail] = useState(false)
  const [mailBody, setMailBody] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    let ok = true

    try {
      await api.post('/admin/createAccount', {
        email,
        password,
        text: mailBody,
      })
      // eslint-disable-next-line
    } catch (err: any) {
      alert(err.response.data)
      setEmail('')
      setPassword('')
      ok = false
    }

    if (addEmail) {
      try {
        const response = await api.post('/admin/sendInvitationMail', {
          email,
          password,
          mailBody,
        })

        console.log(response.data)
      } catch (err) {
        console.log(err)
        ok = false
      }
    }

    if (ok) window.location.reload()
  }

  return (
    <form className="addUser__form" onSubmit={onSubmit}>
      <TextField
        label="Email"
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Parola"
        variant="filled"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="form__email">
        <Checkbox
          value={addEmail}
          onChange={(e) => setAddEmail(e.target.checked)}
        />
        <label>Adauga o invitatie pe mail</label>
      </div>
      {addEmail && (
        <div className="form__email__area">
          <TextField
            multiline
            variant="filled"
            label="Text (optional)"
            value={mailBody}
            fullWidth
            onChange={(e) => setMailBody(e.target.value)}
            minRows={4}
          />
        </div>
      )}
      <Button variant="contained" type="submit">
        Creeaza Cont {addEmail && ' si trimite invitatie'}
      </Button>
    </form>
  )
}
