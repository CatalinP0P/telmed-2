import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './[q].Module.scss'
import useArticlesByQ from 'hooks/useArticlesByQ'
import ArticleCard from '../components/articleCard/articleCard'
import BackButton from 'components/ui/backButton/backButton'

export default function NewsQ() {
  const { q } = useParams()
  const { data: articles, loading } = useArticlesByQ(q + '')

  useEffect(() => {
    if (loading) return

    console.log(articles)
  }, [loading])

  return (
    <div className="newsQ__container">
      <BackButton />
      <label className="newsQ__title">
        Cautari pentru: <span>{q}</span>
      </label>
      <div className="newsQ__articles">
        {/* eslint-disable-next-line */}
        {articles?.map((article: any) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  )
}
