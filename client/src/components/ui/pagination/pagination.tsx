import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import React, { Dispatch } from 'react'
import './pagination.Module.scss'

export default function Pagination({
  page,
  setPage,
  pages,
}: {
  page: number
  setPage: Dispatch<React.SetStateAction<number>>
  pages: number
}) {
  const nextPage = () => {
    const next = page + 1
    if (next >= pages) setPage(0)
    else setPage(next)
  }

  const prevPage = () => {
    const next = page - 1
    if (next < 0) setPage(pages - 1)
    else setPage(next)
  }

  return (
    <div className="pagination">
      <div className="pagination__button" onClick={prevPage}>
        <ArrowBackIos />
      </div>
      <div className="pagination__currentPage">
        {page + 1} <span>/ {pages}</span>
      </div>
      <div className="pagination__button" onClick={nextPage}>
        <ArrowForwardIos />
      </div>
    </div>
  )
}
