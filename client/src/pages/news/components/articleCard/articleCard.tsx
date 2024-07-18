import React from 'react'
import { SERVER_URL } from 'utils/api'
import './articleCard.Module.scss'

// eslint-disable-next-line
export default function ArticleCard({ article }: { article: any }) {
  console.log(article)

  return (
    <div key={article.id} className="article__card">
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
