import useCategories from 'hooks/useCategories'
import React from 'react'
import './categories.Module.scss'
import CategoryCard from './components/categoryCard/categoryCard'

export default function Categories() {
  const { data } = useCategories()
  return (
    <div className="categories">
      <label className="categories__title">Lista de categorii medicale</label>
      {/* eslint-disable-next-line */}
      {data.map((item: any) => {
        return <CategoryCard key={item.id} item={item} />
      })}
    </div>
  )
}
