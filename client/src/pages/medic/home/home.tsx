import useMedic from 'hooks/useMedic'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './home.Module.scss'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Rating,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import useCategories from 'hooks/useCategories'

export default function MedicHome() {
  const { data } = useMedic()
  const navigate = useNavigate()
  const { data: categories } = useCategories()

  const [selectedCategories, setCategories] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof categories>) => {
    const {
      target: { value },
    } = event
    setCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const getFilteredMedic = () => {
    if (data == null) return

    if (selectedCategories.length == 0) return data

    //eslint-disable-next-line
    const x = data as any

    //eslint-disable-next-line
    let medics: any = []
    for (let i = 0; i < x.length; i++) {
      const medic = x[i]
      //eslint-disable-next-line
      for (var j = 0; j < medic.categoriesJSON.length; j++) {
        if (selectedCategories.indexOf(medic.categoriesJSON[j]) > -1) {
          medics = [...medics, medic]
          break
        }
      }
    }

    return medics
  }

  useEffect(() => {
    console.log(getFilteredMedic())
  }, [selectedCategories])

  console.log(categories)

  return (
    <div className="medicHome">
      {/* <label className="medicHome__title">
        Află mai multe despre medicii înregistrați în rețeaua noastră medicală
      </label> */}
      <div className="medicHome__filter">
        <label className="filter__title">Filtre</label>
        <div className="filter__body">
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel
              size="small"
              id="demo-multiple-checkbox-label"
              variant="outlined"
            >
              Specializari
            </InputLabel>
            <Select
              variant="outlined"
              fullWidth
              labelId="demo-simple-select-label"
              input={<OutlinedInput label="Specializari" />}
              id="demo-simple-select"
              multiple
              //eslint-disable-next-line
              value={selectedCategories as any}
              onChange={handleChange}
              renderValue={(selected) => selected.join(', ')}
              size="small"
            >
              {/* eslint-disable-next-line */}
              {categories?.map((item: any) => {
                return (
                  <MenuItem key={item.id} value={item.title}>
                    <Checkbox
                      checked={selectedCategories.indexOf(item.title) > -1}
                      size="small"
                    />
                    <ListItemText primary={item.title} />
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="medicHome__all">
        {/* eslint-disable-next-line */}
        {(getFilteredMedic() as any)?.map((medic: any) => {
          return (
            <div
              key={medic.id}
              className="medicHome__card"
              onClick={() => navigate('/medic/' + medic.user.uid)}
            >
              <label className="card__name">{medic.name}</label>
              <div className="card__rating">
                <Rating
                  readOnly
                  value={(() => {
                    let sum = 0
                    for (let i = 0; i < medic.reviews.length; i++) {
                      sum += medic.reviews[i].rating
                    }

                    return Math.floor(sum / medic.reviews.length)
                  })()}
                />
                <label>({medic.reviews.length} Voturi)</label>
              </div>
              <label className="card__info">Email: {medic.user.email}</label>
              <label className="card__info">Locatie: {medic.location}</label>
              <label className="card__info">Site: {medic.website}</label>
              <label className="card__info">Tel: {medic.phoneNumber}</label>
              <label className="card__categories">
                {medic.categoriesJSON.map((category: string) => {
                  return category + ', '
                })}
              </label>
              {medic.verified ? (
                <div className="card__verified">
                  <CheckIcon />
                  <label>confirmat</label>
                </div>
              ) : (
                <div className="card__notverified">
                  <CloseIcon />
                  <label>neconfirmat</label>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
