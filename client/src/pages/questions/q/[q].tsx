import useQuestionsByQ from 'hooks/useQuestionsByQ'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './[q].Module.scss'
import BackButton from 'components/ui/backButton/backButton'
import SearchBar from '../components/searchBar/searchBar'

export default function QuestionQ() {
  const { q } = useParams()
  const { data: questions, loading } = useQuestionsByQ(q + '')
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return

    console.log(questions)
  }, [loading])

  return (
    <div className="questionsQ__container">
      <BackButton to="/questions" />
      <label className="container__title">Cauta o intrebare</label>
      <div className="container__search">
        <SearchBar />
      </div>
      <label className="container__title">
        Intrebarile pentru: <span>{q}</span>
      </label>
      <div className="container__questions">
        {/* eslint-disable-next-line */}
        {questions.map((question: any) => {
          return (
            <div
              className="question__card"
              onClick={() => navigate('/questions/questionId/' + question.id)}
              key={question.id}
            >
              <label className="card__text">{question.text}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
