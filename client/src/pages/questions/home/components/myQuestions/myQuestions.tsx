import React, { useEffect, useState } from 'react'
import QuestionCard from 'components/ui/questionCard/questionCard'
import { useAuth } from 'context/AuthContext'
import useMyQuestions from 'hooks/useMyQuestions'
import Pagination from 'components/ui/pagination/pagination'
import './myQuestions.Module.scss'

export default function MyQuestions() {
  const itemsPerPage = 10
  const { currentUser, loading: loadingAuth } = useAuth()
  const [authToken, setAuthToken] = useState('')
  const [page, setPage] = useState(0)
  const { data: myQuestions, loading: loadingMyQuestions } =
    useMyQuestions(authToken)

  const fetchAuthToken = async () => {
    const token = await currentUser?.getIdToken()
    setAuthToken(token as string)
  }

  useEffect(() => {
    if (loadingAuth) return

    fetchAuthToken()
  }, [loadingAuth])

  console.log(myQuestions)

  if (loadingMyQuestions) {
    return <></>
  }

  return myQuestions.length > 0 ? (
    <div className="questionHome__myquestions">
      <h2 className="myquestions__title">Intrebarile mele</h2>

      <div className="myquestions__body">
        {myQuestions
          .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
          //eslint-disable-next-line
          .map((question: any) => {
            return <QuestionCard question={question} key={question.id} />
          })}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        pages={Math.ceil(myQuestions.length / itemsPerPage)}
      />
    </div>
  ) : (
    <></>
  )
}
