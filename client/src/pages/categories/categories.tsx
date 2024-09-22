import useCategories from 'hooks/useCategories'
import React from 'react'
import './categories.Module.scss'
import CategoryCardComplex from './components/categoryCardComplex/categoryCardComplex'

export default function Categories() {
  const { data } = useCategories()
  return (
    <div className="categories">
      <label className="categories__title">Lista de categorii medicale</label>
      {/* eslint-disable-next-line */}
      {data.map((item: any) => {
        return <CategoryCardComplex key={item.id} item={item} />
      })}
    </div>
  )
}
