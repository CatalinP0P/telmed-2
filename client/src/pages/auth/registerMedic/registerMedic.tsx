import React, {
  FormEventHandler,
  useState,
  ChangeEventHandler,
  useEffect,
} from 'react'
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import app from 'utils/firebase'
import './registerMedic.Module.scss'
import { createMedicAccount } from 'services/medicService'
import useCategories from 'hooks/useCategories'

export default function RegisterMedic() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRe, setPasswordRe] = useState('')

  const categories = useCategories()

  const navigate = useNavigate()

  interface dataProps {
    name: string
    unit: string
    phoneNumber: string
    website: string
    location: string
    categoriesJSON: string[]
    specialisation: string
  }

  const [data, setData] = useState<dataProps>({
    name: '',
    unit: '',
    phoneNumber: '',
    website: '',
    location: '',
    categoriesJSON: [],
    specialisation: '',
  })

  //eslint-disable-next-line
  const onChangeCategories = (e: any) => {
    const {
      target: { value },
    } = e

    setData((old) => {
      return {
        ...old,
        categoriesJSON: typeof value === 'string' ? value.split(',') : value,
      }
    })
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    setData((old) => {
      return { ...old, [name]: value }
    })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      const auth = app.auth()

      const response1 = await auth.createUserWithEmailAndPassword(
        email,
        password,
      )

      const token = await response1.user?.getIdToken()

      const response2 = await createMedicAccount(token + '', data)
      console.log(response2)

      navigate('/')

      //eslint-disable-next-line
    } catch (err: any) {
      toast.error(err.errors ? err.errors[0].message : 'Sign-up failed')
    }
  }

  return (
    <div className="registerMedic">
      <div className="registerMedic__card">
        <h2 className="registerMedic__title">Creare cont de Doctor</h2>
        <form className="registerMedic__form" onSubmit={onSubmit}>
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
          <TextField
            label="Nume"
            name="name"
            size="small"
            fullWidth
            value={data.name}
            onChange={onChange}
          />
          <TextField
            label="Unitate"
            name="unit"
            size="small"
            fullWidth
            value={data.unit}
            onChange={onChange}
          />
          <TextField
            label="Profesie"
            name="specialisation"
            size="small"
            fullWidth
            value={data.specialisation}
            onChange={onChange}
          />
          <TextField
            label="Numar de Telefon"
            name="phoneNumber"
            size="small"
            type="phone"
            fullWidth
            value={data.phoneNumber}
            onChange={onChange}
          />
          <TextField
            label="Website"
            name="website"
            size="small"
            fullWidth
            value={data.website}
            onChange={onChange}
          />
          <TextField
            label="Locatie clinica"
            name="location"
            size="small"
            fullWidth
            value={data.location}
            onChange={onChange}
          />
          <FormControl fullWidth size="small">
            <InputLabel size="small" id="demo-multiple-checkbox-label">
              Specializari
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              input={<OutlinedInput label="Specializari" />}
              id="demo-simple-select"
              multiple
              value={data.categoriesJSON}
              onChange={onChangeCategories}
              renderValue={(selected) => selected.join(', ')}
              size="small"
            >
              {/* eslint-disable-next-line */}
              {categories?.data.map((item: any) => {
                return (
                  <MenuItem key={item.id} value={item.title}>
                    <Checkbox
                      checked={data.categoriesJSON.indexOf(item.title) > -1}
                      size="small"
                    />
                    <ListItemText primary={item.title} />
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <Button variant="contained" type="submit">
            Creaza cont
          </Button>
          <div className="registerMedic__info">
            <label className="info__item">
              Ai deja un cont?{' '}
              <span onClick={() => navigate('/auth/login')}>Logare</span>
            </label>
            <label className="info__item">
              Vrei cont normal?{' '}
              <span onClick={() => navigate('/auth/register')}>
                Creare cont
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}
