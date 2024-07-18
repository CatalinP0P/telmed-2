import React, { useState } from 'react'
import AdminPageLayout from '../components/adminPageLayout/adminPageLayout'
import AdminCard from '../components/adminCard/adminCard'
import useCategories from 'hooks/useCategories'
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import categoryService from 'services/categoryService'
import './categories.Module.scss'

export default function AdminCateagories() {
  const { data } = useCategories()
  const [newCategory, setNewCategory] = useState('')
  const [description, setDescription] = useState('')
  const [dieseases, setDieseases] = useState('')

  const removeCategory = async (id: string) => {
    await categoryService.remove(id)
    window.location.reload()
  }

  const addCategory = async () => {
    if (newCategory == '') return

    await categoryService.add(newCategory, description, dieseases)
    window.location.reload()
  }

  return (
    <AdminPageLayout>
      <AdminCard title="Categorii" className="categories__card--2">
        <div className="categories__all">
          {/* eslint-disable-next-line */}
          {data.map((item: any) => {
            return (
              <Accordion key={item.id}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <label className="title">{item.title}</label>
                </AccordionSummary>
                <AccordionDetails className="accordion__details">
                  <div className="card__top">
                    <p>{item.description}</p>
                  </div>

                  <div className="card">
                    <label className="card__title">
                      Afectiuni comune tratate
                    </label>
                    <p className="card__text">{item.description}</p>
                  </div>
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    onClick={() => removeCategory(item.id)}
                    variant="contained"
                  >
                    Sterge
                  </Button>
                </AccordionActions>
              </Accordion>
            )
          })}
        </div>
        <div className="categories__add">
          <TextField
            size="small"
            label="Adauga categorie"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
          />
          <TextField
            size="small"
            label="Descriere"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          ></TextField>
          <TextField
            size="small"
            label="Afectiuni"
            multiline
            value={dieseases}
            onChange={(e) => setDieseases(e.target.value)}
            fullWidth
          ></TextField>

          <Button variant="contained" onClick={() => addCategory()}>
            Adauga
          </Button>
        </div>
      </AdminCard>
    </AdminPageLayout>
  )
}
