import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './[categoryId].Module.scss'
import useQuestions from 'hooks/useQuestions'
import useCategory from 'hooks/useCategory'
import { Button, TextField } from '@mui/material'
import questionService from 'services/questionService'
import { useAuth } from 'context/AuthContext'
import BackButton from 'components/ui/backButton/backButton'
import QuestionCard from 'components/ui/questionCard/questionCard'

export default function QuestionCategoryID() {
  const { categoryId } = useParams()
  const { data: category } = useCategory(parseInt(categoryId + ''))
  const { data, loading } = useQuestions(parseInt(categoryId + ''))

  const [newQuestion, setNewQuestion] = useState('')
  const { currentUser, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const addQuestion = async () => {
    if (authLoading) return
    if (currentUser == null) navigate('/auth/login')
    if (newQuestion.trim() == '') return

    const authToken = (await currentUser?.getIdToken()) as string

    await questionService.add(authToken, categoryId + '', newQuestion)

    window.location.reload()
  }

  return (
    <div className="questionsCategory">
      <BackButton />
      <label className="questionsCategory__title">
        {/* eslint-disable-next-line */}
        Intrebari despre: <span>{(category as any)?.title}</span>
      </label>

      <div className="questionsCategory__questions">
        {data.length > 0
          ? // eslint-disable-next-line
            data.map((question: any) => {
              return <QuestionCard question={question} key={question.id} />
            })
          : !loading && (
              <label className="questionsCategory__info">
                Nici-o intrebare in categoria asta.
              </label>
            )}
      </div>

      <div className="questionsCategory__ask">
        <TextField
          label="Intreaba"
          size="small"
          fullWidth
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <Button variant="contained" onClick={addQuestion}>
          Trimite
        </Button>
      </div>
    </div>
  )
}
