import React from 'react'
import './footer.Module.scss'
import { Facebook } from '@mui/icons-material'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__copyright">
          © All Rights Reserved {new Date().getFullYear()}
        </div>
        <div className="footer__links">
          <div
            className="link"
            onClick={() =>
              window.open('https://www.facebook.com/share/RriDKi6Fvq2Z5H9K/')
            }
          >
            <Facebook />
          </div>
        </div>
      </div>
    </div>
  )
}
