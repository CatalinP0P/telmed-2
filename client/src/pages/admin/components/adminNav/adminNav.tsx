import React from 'react'
import adminSiteMap from 'sitemaps/adminSiteMap'
import { useNavigate } from 'react-router-dom'
import './adminNav.Module.scss'

export default function AdminNav() {
  const navigate = useNavigate()

  return (
    <div className="adminNav">
      {adminSiteMap.map((page) => {
        return (
          <label
            key={page.link}
            onClick={() => navigate(page.link)}
            className={`nav__item ${window.location.pathname == page.link ? 'nav__item__active' : ''}`}
          >
            {page.title}
          </label>
        )
      })}
    </div>
  )
}
