import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './searchBar.Module.scss'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  return (
    <div className="news__search">
      <TextField
        fullWidth
        value={q}
        label="Cauta prin articole"
        onChange={(e) => setQ(e.target.value)}
        variant="filled"
        color="secondary"
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 2,
          paddingBottom: 2,
        }}
        onClick={() => navigate('/news/q/' + q)}
      >
        Cauta
      </Button>
    </div>
  )
}
