import React from 'react'
import { useNavigate } from 'react-router-dom'
import './questionCard.Module.scss'

// eslint-disable-next-line
export default function QuestionCard({ question }: { question: any }) {
  const navigate = useNavigate()

  return (
    <div
      className="questions__card"
      onClick={() => navigate('/questions/questionId/' + question.id)}
      key={question.id}
    >
      {question.text}
    </div>
  )
}
