import React, { useState } from 'react'
import './[categoryId].Module.scss'
import useCategory from 'hooks/useCategory'
import { useParams } from 'react-router-dom'
import useArticles from 'hooks/useArticles'
import ArticleCard from '../components/articleCard/articleCard'
import BackButton from 'components/ui/backButton/backButton'

export default function NewsCategory() {
  const { categoryId } = useParams()
  const { data: category } = useCategory(parseInt(categoryId + ''))
  const { data: articles } = useArticles(categoryId + '')

  //eslint-disable-next-line
  const [formData, setFormData] = useState<any>({
    title: '',
    text: '',
    imageURL: '',
    videoURL: '',
  })

  return (
    <div className="newsCategory">
      <BackButton />
      <label className="newsCategory__title">
        Articole in: {category?.title}
      </label>
      <div className="newsCategory__articles">
        {/* eslint-disable-next-line */}
        {articles
          //eslint-disable-next-line
          ?.filter((m: any) => m.confirmed)
          //eslint-disable-next-line
          .map((article: any) => {
            return <ArticleCard article={article} key={article.id} />
          })}
      </div>
    </div>
  )
}
