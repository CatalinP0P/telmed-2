import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './home.Module.scss'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <label className="home__title">Telmed</label>
      <label className="home__text">
        Bun venit la TelMed.pro, aici puteți pune întrebări unei comunități de
        profesioniști în domeniul medical.
      </label>

      <label className="home__text">
        Solicitați sfaturi și recomandări medicale, sau împărtășiți nelămuriri
        sau întrebări legate de tratamente
      </label>

      <div>
        <Button variant="outlined" onClick={() => navigate('/questions')}>
          Intreaba acum
        </Button>
      </div>
    </div>
  )
}
