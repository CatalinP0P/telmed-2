import React from 'react'
import AdminPageLayout from 'pages/admin/components/adminPageLayout/adminPageLayout'
import { useNavigate, useParams } from 'react-router-dom'
import './[categoryId].Module.scss'
import useCategory from 'hooks/useCategory'
import useArticles from 'hooks/useArticles'
import ArticleCard from 'pages/news/components/articleCard/articleCard'
import BackButton from 'components/ui/backButton/backButton'

export default function AdminArticleCategory() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { data: articles, loading: articlesLoading } = useArticles(
    parseInt(categoryId + ''),
  )
  const { data: category, loading: categoryLoading } = useCategory(
    parseInt(categoryId + ''),
  )

  if (categoryLoading || articlesLoading)
    return (
      <AdminPageLayout>
        <h2>loading...</h2>
      </AdminPageLayout>
    )

  if (!categoryLoading && category == null) navigate('/admin/articles')

  return (
    <AdminPageLayout>
      <BackButton />
      <h1>Articole in: {category.title}</h1>
      <div className="admin__article__category">
        {/* eslint-disable-next-line */}
        {articles.map((article: any) => {
          return (
            <ArticleCard
              article={article}
              navigateTo={`/admin/articles/edit/${article.id}`}
              key={article.id}
            />
          )
        })}
      </div>
    </AdminPageLayout>
  )
}
