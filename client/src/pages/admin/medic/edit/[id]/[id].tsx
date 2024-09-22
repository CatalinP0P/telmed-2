// import { useAuth } from 'context/AuthContext'
import useMedicById from 'hooks/useMedicById'
import AdminPageLayout from 'pages/admin/components/adminPageLayout/adminPageLayout'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './[id].Module.scss'
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
import BackButton from 'components/ui/backButton/backButton'
import useCategories from 'hooks/useCategories'
import { useAuth } from 'context/AuthContext'
import medicService from 'services/medicService'

export default function AdminMedicEditId() {
  const { id: medicId } = useParams()
  const { currentUser, loading: loadingAuth } = useAuth()
  const categories = useCategories()
  const navigate = useNavigate()

  const { data: medic, loading: loadingMedic } = useMedicById(medicId + '')

  //eslint-disable-next-line
  const [newData, setNewData] = useState<any>({
    name: '',
    website: '',
    phoneNumber: '',
    specialisation: '',
    categoriesJSON: [],
    location: '',
    unit: '',
    verified: '',
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    //eslint-disable-next-line
    setNewData((old: any) => {
      return { ...old, [name]: value }
    })
  }

  const onSave = async () => {
    if (loadingAuth) return

    const authToken = (await currentUser?.getIdToken()) as string

    await medicService.edit(authToken, medicId, {
      ...newData,
      categoriesJSON: JSON.stringify(newData.categoriesJSON),
    })

    navigate(-1)
  }

  //eslint-disable-next-line
  const onChangeCategories = (e: any) => {
    const {
      target: { value },
    } = e

    //eslint-disable-next-line
    setNewData((old: any) => {
      return {
        ...old,
        categoriesJSON: typeof value === 'string' ? value.split(',') : value,
      }
    })
  }

  useEffect(() => {
    if (loadingMedic) return

    const x = {
      name: medic.name,
      website: medic.website,
      phoneNumber: medic.phoneNumber,
      specialisation: medic.specialisation,
      categoriesJSON: medic.categoriesJSON,
      location: medic.location,
      unit: medic.unit,
      verified: medic.verified,
    }

    setNewData(x)

    console.log(x)
    console.log(medic)
  }, [loadingMedic])

  return (
    <AdminPageLayout>
      <BackButton />
      <div className="adminEditMedic">
        <div className="adminEditMedic__form">
          <TextField
            label="Nume"
            name="name"
            size="small"
            fullWidth
            value={newData.name}
            onChange={onChange}
            variant="filled"
            color="secondary"
          />
          <TextField
            label="Unitate"
            name="unit"
            size="small"
            fullWidth
            value={newData.unit}
            onChange={onChange}
            variant="filled"
            color="secondary"
          />
          <TextField
            label="Profesie"
            name="specialisation"
            size="small"
            fullWidth
            value={newData.specialisation}
            onChange={onChange}
            variant="filled"
            color="secondary"
          />
          <TextField
            label="Numar de Telefon"
            name="phoneNumber"
            size="small"
            type="phone"
            fullWidth
            value={newData.phoneNumber}
            onChange={onChange}
            variant="filled"
            color="secondary"
          />
          <TextField
            label="Website"
            name="website"
            size="small"
            fullWidth
            value={newData.website}
            onChange={onChange}
            variant="filled"
            color="secondary"
          />
          <TextField
            label="Locatie clinica"
            name="location"
            size="small"
            fullWidth
            value={newData.location}
            onChange={onChange}
            variant="filled"
            color="secondary"
          />

          <FormControl fullWidth color="secondary">
            <InputLabel size="small" id="demo-multiple-checkbox-label">
              Specializari
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              input={<OutlinedInput label="Specializari" />}
              id="demo-simple-select"
              multiple
              value={newData.categoriesJSON}
              onChange={onChangeCategories}
              renderValue={(selected) => selected.join(', ')}
              size="small"
            >
              {/* eslint-disable-next-line */}
              {categories?.data.map((item: any) => {
                return (
                  <MenuItem key={item.id} value={item.title}>
                    <Checkbox
                      checked={newData.categoriesJSON.indexOf(item.title) > -1}
                      size="small"
                    />
                    <ListItemText primary={item.title} />
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <div className="form__checkbox">
            <Checkbox
              checked={newData.verified}
              color="secondary"
              onChange={(e) =>
                // eslint-disable-next-line
                setNewData((old: any) => {
                  return { ...old, verified: e.target.checked }
                })
              }
            />
            <label>Verificat</label>
          </div>

          <Button onClick={onSave} variant="contained" color="secondary">
            Salveaza
          </Button>
        </div>
      </div>
    </AdminPageLayout>
  )
}
