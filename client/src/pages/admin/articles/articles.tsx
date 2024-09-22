import React from 'react'
import './articles.Module.scss'
import AdminPageLayout from '../components/adminPageLayout/adminPageLayout'
import useCategories from 'hooks/useCategories'
import CategoryCard from 'components/ui/categoryCard/categoryCard'

export default function AdminArticles() {
  const { data: categories, loading } = useCategories()

  if (loading) {
    return <h2>loading...</h2>
  }

  return (
    <>
      <AdminPageLayout>
        <div className="admin__articles__categories">
          {/* eslint-disable-next-line */}
          {categories.map((category: any) => {
            return (
              <CategoryCard
                key={category.id}
                category={category}
                navigateTo={'/admin/articles/' + category.id}
              />
            )
          })}
        </div>
      </AdminPageLayout>
    </>
  )
}
