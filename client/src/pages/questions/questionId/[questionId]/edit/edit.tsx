import { Button, TextField } from '@mui/material'
import BackButton from 'components/ui/backButton/backButton'
import { useAuth } from 'context/AuthContext'
import useQuestion from 'hooks/useQuestion'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './edit.Module.scss'
import questionService from 'services/questionService'

export default function QuestionQuestionIdEdit() {
  const { currentUser } = useAuth()
  const { id: questionId } = useParams()
  const { data: question, loading: loadingQuestion } = useQuestion(
    parseInt(questionId + ''),
  )

  const navigate = useNavigate()
  //eslint-disable-next-line
  const [data, setData] = useState<any>({ text: '' })
  //eslint-disable-next-line
  const [newData, setNewData] = useState<any>({ text: '' })

  useEffect(() => {
    if (loadingQuestion || question == null) return

    setNewData({ text: question?.text })
    setData({ text: question?.text })
    console.log(question)
  }, [loadingQuestion])

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    //eslint-disable-next-line
    setNewData((old: any) => {
      return { ...old, [name]: value }
    })
  }

  const onSave = async () => {
    const authToken = (await currentUser?.getIdToken()) as string
    await questionService.update(authToken, parseInt(questionId + ''), newData)

    navigate(-1)
  }

  if (loadingQuestion) return <>loading...</>

  return (
    <div className="questionQuestionIdEdit">
      <BackButton />
      <TextField
        value={newData.text}
        label="Text"
        name="text"
        onChange={onChange}
        multiline
        variant="filled"
        color="secondary"
      />

      <Button variant="contained" color="secondary" onClick={onSave}>
        Salveaza
      </Button>
    </div>
  )
}
