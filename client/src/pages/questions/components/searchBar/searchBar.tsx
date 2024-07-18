import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './searchBar.Module.scss'

export default function SearchBar() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const search = () => {
    if (q.trim() == '') return

    navigate('/questions/q/' + q)
  }

  return (
    <div className="searchBar">
      <TextField
        variant="filled"
        color="secondary"
        label="Cauta Intrebare"
        fullWidth
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <Button
        onClick={search}
        variant="contained"
        color="secondary"
        sx={{ paddingLeft: 4, paddingRight: 4 }}
      >
        Cauta
      </Button>
    </div>
  )
}
