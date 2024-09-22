import React from 'react'
import useQuestionsByCategory from 'hooks/useQuestionsByCategory'
import CategoryCard from './components/categoryCard/categoryCard'
import './home.Module.scss'
import SearchBar from '../components/searchBar/searchBar'
import MyQuestions from './components/myQuestions/myQuestions'
import MyAnswers from './components/myAnswers/myAnswers'

export default function QuestionsHome() {
  const { data } = useQuestionsByCategory()

  return (
    <div className="questionsHome">
      <label className="questionHome__title">Cauta o intrebare</label>
      <SearchBar />
      <MyAnswers />
      <MyQuestions />

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
