import React from 'react'
import './categoryCard.Module.scss'
import { useNavigate } from 'react-router-dom'

export default function CategoryCard({
  category,
  navigateTo,
}: {
  //eslint-disable-next-line
  category: any
  navigateTo: string
}) {
  const navigate = useNavigate()

  return (
    <div
      key={category.id}
      className="category__card"
      onClick={() => {
        navigate(navigateTo + '')
      }}
    >
      {category.title}
    </div>
  )
}
