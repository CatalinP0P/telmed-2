import { Button, TextField } from '@mui/material'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import './home.Module.scss'
import { api } from 'utils/api'
import { toast } from 'react-toastify'

export default function ContactHome() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    text: '',
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    setFormData((old) => {
      return { ...old, [name]: value }
    })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post('/form/contact', formData)
      toast.success(response.data)
    } catch (err) {
      toast.error(JSON.stringify(err))
    }
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      text: '',
    })
  }

  return (
    <div className="contact">
      <label className="contact__title">Contact</label>
      <form className="contact__form" onSubmit={onSubmit}>
        <TextField
          variant="filled"
          color="secondary"
          label="Nume si Prenume"
          fullWidth
          name="name"
          value={formData.name}
          onChange={onChange}
        />
        <div className="form__row">
          <TextField
            variant="filled"
            color="secondary"
            label="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
          <TextField
            variant="filled"
            color="secondary"
            label="Numar de Telefon"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
          />
        </div>
        <TextField
          multiline
          variant="filled"
          color="secondary"
          label="Intrebare / Continut"
          name="text"
          value={formData.text}
          onChange={onChange}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          type="submit"
          size="large"
        >
          Trimite
        </Button>
      </form>
    </div>
  )
}
