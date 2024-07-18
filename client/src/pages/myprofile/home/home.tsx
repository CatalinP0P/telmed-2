/* eslint-disable */
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { useAuth } from 'context/AuthContext'
import IsMedic from 'components/layout/isMedic/isMedic'
import useMedicById from 'hooks/useMedicById'
import './home.Module.scss'
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
import useCategories from 'hooks/useCategories'
import medicService from 'services/medicService'
import { useNavigate } from 'react-router-dom'

export default function MyProfileHome() {
  const { currentUser, loading } = useAuth()
  const { data: categories } = useCategories()
  const { data: medicInfo } = useMedicById(currentUser?.uid + '')

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return

    if (currentUser == null) navigate('/auth/login')
  }, [loading])

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    categoriesJSON: '',
    unit: '',
    location: '',
    website: '',
  })

  useEffect(() => {
    if (medicInfo == null) return

    setFormData({
      name: (medicInfo as any).name,
      phoneNumber: (medicInfo as any).phoneNumber,
      categoriesJSON: (medicInfo as any).categoriesJSON,
      unit: (medicInfo as any).unit,
      location: (medicInfo as any).location,
      website: (medicInfo as any).website,
    })
  }, [medicInfo])

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setFormData((old) => {
      return { ...old, [name]: value }
    })
  }

  const onChangeCategories = (e: any) => {
    const {
      target: { value },
    } = e

    setFormData((old) => {
      return {
        ...old,
        categoriesJSON: typeof value === 'string' ? value.split(',') : value,
      }
    })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const authToken = (await currentUser?.getIdToken()) + ''
    await medicService.updateData(authToken, formData)

    window.location.reload()
  }

  return (
    <div className="myProfie__home">
      <label className="home__title">Editeaza Profilul Tau</label>
      <IsMedic>
        <form className="myProfile__settings" onSubmit={onSubmit}>
          <TextField
            label="Nume"
            size="small"
            name="name"
            value={formData.name}
            onChange={onChange}
          />
          <TextField
            label="Numar de Telefon"
            size="small"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
          />
          <TextField
            label="Website"
            name="website"
            value={formData.website}
            size="small"
            onChange={onChange}
          />
          <TextField
            label="Unitate"
            name="unit"
            value={formData.unit}
            size="small"
            onChange={onChange}
          />
          <TextField
            label="Locatie"
            name="location"
            value={formData.location}
            size="small"
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
              value={formData.categoriesJSON || []}
              onChange={onChangeCategories}
              renderValue={(selected: any) => selected.join(', ')}
              size="small"
            >
              {/* eslint-disable-next-line */}
              {categories?.map((item: any) => {
                return (
                  <MenuItem key={item.id} value={item.title}>
                    <Checkbox
                      checked={formData.categoriesJSON.indexOf(item.title) > -1}
                      size="small"
                    />
                    <ListItemText primary={item.title} />
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <Button variant="contained" size="large" type="submit">
            Salveaza
          </Button>
        </form>
      </IsMedic>
    </div>
  )
}
