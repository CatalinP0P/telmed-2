import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './[questionId].Module.scss'
import useQuestion from 'hooks/useQuestion'
import IsMedic from 'components/layout/isMedic/isMedic'
import { Button, TextField } from '@mui/material'
import questionService from 'services/questionService'
import { useAuth } from 'context/AuthContext'
import BackButton from 'components/ui/backButton/backButton'
import { Edit } from '@mui/icons-material'

export default function QuestionQuestionId() {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const { data: question, loading } = useQuestion(parseInt(id + ''))
  const navigate = useNavigate()

  const [response, setResponse] = useState('')

  const sendResponse = async () => {
    if (currentUser == null) return
    if (response.trim() == '') return

    const authToken = await currentUser?.getIdToken()
    await questionService.addResponse(authToken, parseInt(id + ''), response)

    window.location.reload()
  }

  if (loading) return <>...loading</>

  return (
    <div className="question__container">
      <BackButton />
      <div className="question__header">
        <div className="card__header">
          {currentUser?.uid == question?.userId && (
            <div
              className="question__edit"
              onClick={() => navigate(`/questions/questionId/${id}/edit`)}
            >
              <Edit />
            </div>
          )}
          {question?.user.email}
        </div>
        <div className="card__body">{question?.text}</div>
      </div>
      <div className="question__responses">
        {/* eslint-disable-next-line */}
        {question?.responses.map((response: any) => {
          return (
            <div className="response__card" key={response?.id}>
              <div className="card__header">
                {response?.user.email}
                {response.userId == currentUser?.uid && (
                  <div
                    className="card__edit"
                    onClick={() =>
                      navigate(
                        `/questions/questionId/${question.id}/${response.id}/edit`,
                      )
                    }
                  >
                    <Edit />
                  </div>
                )}
                {question.userId == currentUser?.uid && (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate('/medic/' + response?.user.uid)}
                  >
                    Adauga recenzie
                  </Button>
                )}
              </div>
              <div className="card__body">{response?.text}</div>
            </div>
          )
        })}
      </div>

      <IsMedic>
        <div className="question__respond">
          <TextField
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            label="Raspunde la intrebare"
            fullWidth
            variant="filled"
            size="small"
            color="secondary"
          />
          <Button
            onClick={sendResponse}
            variant="contained"
            color="secondary"
            size="large"
          >
            Trimite
          </Button>
        </div>
      </IsMedic>
    </div>
  )
}
