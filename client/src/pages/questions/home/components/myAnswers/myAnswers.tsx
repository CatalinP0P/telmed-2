import { Reply } from '@mui/icons-material'
import { useAuth } from 'context/AuthContext'
import React, { useEffect, useState } from 'react'
import questionService from 'services/questionService'
import './myAnswers.Module.scss'
import { useNavigate } from 'react-router-dom'
import Pagination from 'components/ui/pagination/pagination'

export default function MyAnswers() {
  const { currentUser, loading: loadingAuth } = useAuth()
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  const itemsPerPage = 10

  // eslint-disable-next-line
  const [answers, setAnswers] = useState<any[]>()

  const fetchData = async () => {
    if (loadingAuth || currentUser == null) return

    const token = await currentUser.getIdToken()
    const response = await questionService.getMyAnswers(token as string)
    setAnswers(response)
  }

  useEffect(() => {
    fetchData()
  }, [loadingAuth, currentUser])

  return answers?.length ? (
    <div className="myAnswers">
      <h2 className="myAnswers__title">Raspunsurile mele</h2>
      <div className="myAnswers__body">
        {/* eslint-disable-next-line */}
        {answers?.map((answer: any) => {
          return (
            <div
              className="answer"
              key={answer.id}
              onClick={() =>
                navigate('/questions/questionId/' + answer.questionId)
              }
            >
              <label className="answer__question">{answer.question.text}</label>

              <div className="answer__body">
                <div className="answer__icon">
                  <Reply fontSize="inherit" />
                </div>

                <label className="answer__text">{answer.text}</label>
              </div>
            </div>
          )
        })}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        pages={Math.ceil(answers.length / itemsPerPage)}
      />
    </div>
  ) : (
    <div></div>
  )
}
