import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import questionService from 'services/questionService'
import { Button, TextField } from '@mui/material'
import { useAuth } from 'context/AuthContext'
import { getAuthorizedApi } from 'utils/api'
import BackButton from 'components/ui/backButton/backButton'
import './edit.Module.scss'

export default function QuestionResponseEdit() {
  const { responseId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  // eslint-disable-next-line
  const [data, setData] = useState<any>()
  // eslint-disable-next-line
  const [newData, setNewData] = useState<any>({ text: '' })

  const fetchData = async () => {
    const response = await questionService.getResponseById(responseId as string)

    setData(response)
    setNewData({ text: response.text })
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    // eslint-disable-next-line
    setNewData((old: any) => {
      return { ...old, [name]: value }
    })
  }

  const onSave = async () => {
    if (currentUser == null) return

    const authToken = (await currentUser.getIdToken()) as string
    const api = getAuthorizedApi(authToken)
    await api.post(`/question/response/${responseId}/edit`, newData)
    navigate(-1)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="questionResponseEdit">
      <BackButton />
      <div className="questionResponseEdit__form">
        <TextField
          value={newData.text}
          name="text"
          label="Text"
          variant="filled"
          color="secondary"
          fullWidth
          onChange={onChange}
        />

        <Button onClick={onSave} variant="contained" color="secondary">
          Salveaza
        </Button>
      </div>
    </div>
  )
}
