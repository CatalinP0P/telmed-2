import useMedicById from 'hooks/useMedicById'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'
import './[id].Module.scss'
import { Button, Rating, TextField } from '@mui/material'
import BackButton from 'components/ui/backButton/backButton'
import { useAuth } from 'context/AuthContext'
import medicService from 'services/medicService'

export default function MedicById() {
  const { id } = useParams()
  const { data: medic, loading } = useMedicById(id + '')
  const { currentUser } = useAuth()

  const [reviewValue, setReviewValue] = useState(5)
  const [reviewText, setReviewText] = useState('')

  const sendReview = async () => {
    const token = (await currentUser?.getIdToken()) as string
    await medicService.addReview(token, medic.userId, reviewValue, reviewText)
    window.location.reload()
  }

  useEffect(() => {
    if (loading) return

    console.log(medic)
  }, [loading])

  return (
    <div className="medicId__container">
      <BackButton />
      <div className="medicId__card">
        <div className="card__name">
          {medic?.name}{' '}
          {medic?.verified ? (
            <div className="card__verified">
              <Check />
            </div>
          ) : (
            <div className="card__notverified">
              <Close />
            </div>
          )}
        </div>
        <div className="card__body">
          <div className="card__info">
            <div className="info__key">Tel:</div>
            <div className="info__value">{medic?.phoneNumber}</div>
          </div>
          <div className="card__info">
            <div className="info__key">Site:</div>
            <div className="info__value">{medic?.website}</div>
          </div>
          <div className="card__info">
            <div className="info__key">Locatie:</div>
            <div className="info__value">{medic?.location}</div>
          </div>
          <div className="card__info">
            <div className="info__key">Unitate:</div>
            <div className="info__value">{medic?.unit}</div>
          </div>
          <label className="card__categories">
            {medic?.categoriesJSON.map((category: string) => {
              return category + ', '
            })}
          </label>
        </div>
        <div className="card__reviews">
          <div className="reviews__title">
            Recenzii
            {medic && (
              <>
                <Rating
                  readOnly
                  value={(() => {
                    let sum = 0
                    for (let i = 0; i < medic?.reviews.length; i++) {
                      sum += medic.reviews[i].rating
                    }

                    return Math.floor(sum / medic.reviews.length)
                  })()}
                />
                <span className="count">{`(${medic?.reviews.length})`}</span>
              </>
            )}
          </div>
          {/* eslint-disable-next-line */}
          {medic?.reviews.map((review: any) => {
            console.log(review)
            return (
              <div className="review" key={review.id}>
                <div className="review__left">
                  <label className="review__email">{review.user.email}</label>
                  <Rating value={review.rating} size="small" />
                </div>
                <div className="review__right">
                  <p>{review.text}</p>
                </div>
              </div>
            )
          })}

          {currentUser && currentUser?.uid != medic?.userId && (
            <div className="review__add">
              <div className="add__header">
                <label>Scrie un review</label>
                <Rating
                  value={reviewValue}
                  onChange={(event, newValue) => {
                    setReviewValue(parseInt(newValue + ''))
                  }}
                />
              </div>
              <div className="add__body">
                <TextField
                  size="small"
                  fullWidth
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <Button variant="contained" onClick={sendReview}>
                  Adauga
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
