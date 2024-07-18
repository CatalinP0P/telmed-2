import React, { useEffect } from 'react'
import useQuestionsByCategory from 'hooks/useQuestionsByCategory'
import CategoryCard from './components/categoryCard/categoryCard'
import './home.Module.scss'
import SearchBar from '../components/searchBar/searchBar'

export default function QuestionsHome() {
  const { data, loading } = useQuestionsByCategory()

  useEffect(() => {
    if (loading) return

    console.log(data)
  }, [loading])

  return (
    <div className="questionsHome">
      <label className="questionHome__title">Cauta o intrebare</label>
      <SearchBar />
      <label className="questionHome__title">
        Categorii medicale si intrebari recente
      </label>
      <div className="questionHome__categories">
        {/* eslint-disable-next-line */}
        {data?.map((category: any) => {
          return <CategoryCard category={category} key={category.id} />
        })}
      </div>
    </div>
  )
}
