import { ArrowBackRounded } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './backButton.Module.scss'

export default function BackButton({ to }: { to?: string }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        to ? navigate(to) : navigate(-1)
      }}
      className="backButton"
    >
      <ArrowBackRounded /> <label>inapoi</label>
    </div>
  )
}
