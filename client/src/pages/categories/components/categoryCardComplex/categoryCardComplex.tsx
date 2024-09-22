import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import useMedicFromCategory from 'hooks/useMedicFromCategory'
import React from 'react'
import './categoryCardComplex.Module.scss'

//eslint-disable-next-line
export default function CategoryCard({ item }: { item: any }) {
  const { data } = useMedicFromCategory(item.title)

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
          <label className="card__title">Afectiuni comune tratate</label>
          <p className="card__text">{item.description}</p>
        </div>

        <div className="medic__all">
          {/* eslint-disable-next-line */}
          {(data as any)?.length > 0 && (
            <label className="medic__title">Medici</label>
          )}
          {/* eslint-disable-next-line */}
          {(data as any)?.map((medic: any) => {
            return (
              <div key={medic.userId} className="medic__card">
                <label className="card__name">{medic.user?.email}</label>
                <div className="card__body">
                  <label className="body__phone">
                    Tel: {medic.phoneNumber}
                  </label>
                  <label className="body__website">
                    Website: {medic.website}
                  </label>
                </div>
              </div>
            )
          })}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
