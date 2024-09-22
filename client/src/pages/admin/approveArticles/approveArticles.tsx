import React, { useEffect } from 'react'
import AdminPageLayout from '../components/adminPageLayout/adminPageLayout'
import './approveArticles.Module.scss'
import ArticleCard from 'pages/news/components/articleCard/articleCard'
import useArticlesNotVerified from 'hooks/useArticlesNotVerified'
import BackButton from 'components/ui/backButton/backButton'

export default function AdminApproveArticles() {
  const { data: articles, loading } = useArticlesNotVerified()

  useEffect(() => {
    if (loading) return
    console.log(articles)
  }, [loading])

  if (loading) {
    return <AdminPageLayout>loading...</AdminPageLayout>
  }

  return (
    <AdminPageLayout>
      <BackButton />
      <div className="adminApproveArticles">
        <h2 className="adminApproveArticles__title">
          Articole neconfirmate: <b>{articles.length}</b>
        </h2>
        <div className="adminApproveArticles__body">
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
      </div>
    </AdminPageLayout>
  )
}
