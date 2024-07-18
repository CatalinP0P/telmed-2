import React from 'react'
import './adminCard.Module.scss'

interface adminCardProps {
  children?: React.ReactNode
  title?: string
  className?: string
}

export default function AdminCard({
  children,
  title,
  className,
}: adminCardProps) {
  return (
    <div className={`adminCard ${className || ''}`}>
      {title != null && (
        <div className="adminCard__title">
          <label>{title}</label>
        </div>
      )}
      <div className="adminCard__body">{children}</div>
    </div>
  )
}
