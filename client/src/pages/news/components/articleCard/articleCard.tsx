import React from 'react'
import { SERVER_URL } from 'utils/api'
import './articleCard.Module.scss'
import { useNavigate } from 'react-router-dom'
import { Edit } from '@mui/icons-material'
import { useAuth } from 'context/AuthContext'

export default function ArticleCard({
  article,
  navigateTo,
}: {
  // eslint-disable-next-line
  article: any
  navigateTo?: string
}) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  return (
    <div
      key={article.id}
      className={
        'article__card ' + (navigateTo != null ? 'article__card--click' : '')
      }
      onClick={() => {
        if (navigateTo) navigate(navigateTo + '')
      }}
    >
      {currentUser?.uid === article.userId && (
        <div
          className="card__edit__icon"
          onClick={() => {
            navigate('/news/edit/' + article.id)
          }}
        >
          <Edit fontSize="inherit" color="inherit" />
        </div>
      )}
      <label className="card__title">{article.title}</label>
      <p className="card__text">{article.text}</p>
      <div className="card__media">
        {article.imageURL != null && (
          <img
            className="card__image"
            src={SERVER_URL + article.imageURL}
            onClick={() => window.open(SERVER_URL + article.imageURL)}
          />
        )}

        {article.videoURL != null && (
          <video
            className="card__video"
            src={SERVER_URL + article.videoURL}
            controls
          />
        )}
        {article.audioURL != null && (
          <>
            <audio src={SERVER_URL + article.audioURL} controls />
          </>
        )}
      </div>
    </div>
  )
}
