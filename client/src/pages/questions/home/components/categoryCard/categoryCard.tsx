import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './categoryCard.Module.scss'
import { Button } from '@mui/material'

//eslint-disable-next-line
export default function CategoryCard({ category }: { category: any }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  return (
    <div key={category.id} className="categories__card">
      <div className="card__header" onClick={() => setExpanded(!expanded)}>
        <label className="card__title">{category.title}</label>
        <label className="card__number">{category.questions.length}</label>
      </div>
      {expanded && (
        <div>
          <div className="card__body">
            {/* making a new copy of the array so it does not modify */}
            {JSON.parse(JSON.stringify(category.questions))
              .splice(0, 5)
              //eslint-disable-next-line
              .map((question: any, number: number) => {
                return (
                  <div className="body__question" key={number}>
                    <div className="question__header">
                      <label>{number + 1}. </label>
                      <label>{question.text}</label>
                    </div>
                    <Button
                      variant="text"
                      color="secondary"
                      size="small"
                      onClick={() =>
                        navigate('/questions/questionId/' + question.id)
                      }
                    >
                      Vezi Raspunsuri
                    </Button>
                  </div>
                )
              })}
          </div>
          <div className="card__footer">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/questions/' + category.id)}
            >
              Vezi toate intrebarile
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
