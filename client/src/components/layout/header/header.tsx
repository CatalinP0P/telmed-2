import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { Button } from '@mui/material'
import SignedIn from '../signedIn/signedIn'
import SignedOut from '../signedOut/signedOut'
import { toast } from 'react-toastify'
import { siteMap } from 'sitemaps/siteMap'
import { Close, Menu } from '@mui/icons-material'
import logo from 'assets/logo.png'
import './header.Module.scss'

export default function Header() {
  const navigate = useNavigate()
  const { currentUser, signOut, error } = useAuth()
  const [mobileVisible, setMobileVisible] = useState(false)

  useEffect(() => {
    if (error == null) return

    toast.error(error)
  }, [error])

  return (
    <div className="header">
      <div className="header__container">
        <img
          className="header__logo"
          onClick={() => navigate('/')}
          src={logo}
        ></img>

        <div className="header__mobile">
          <div
            className="header__mobile__button"
            onClick={() => setMobileVisible(true)}
          >
            <Menu />
          </div>
          {mobileVisible && (
            <div
              className="mobile__overlay"
              onClick={() => setMobileVisible(false)}
            ></div>
          )}
          <div
            className={
              'mobile__menu ' + (mobileVisible ? 'mobile__menu__active' : '')
            }
          >
            <div
              className="body__close"
              onClick={() => setMobileVisible(false)}
            >
              <Close />
            </div>
            {siteMap.map((link) => {
              return (
                <label
                  key={link.link}
                  className="mobile__link"
                  onClick={() => {
                    navigate(link.link), setMobileVisible(false)
                  }}
                >
                  {link.title}
                </label>
              )
            })}
            <SignedIn>
              <label
                className="mobile__link"
                onClick={() => {
                  navigate('/myprofile'), setMobileVisible(false)
                }}
              >
                Profilul meu
              </label>
              <label className="account__name">
                <span>Salut,</span> <span>{currentUser?.email + ''}</span>
              </label>
              <Button
                variant="outlined"
                onClick={() => {
                  signOut(), setMobileVisible(false)
                }}
              >
                Deconecteza-te
              </Button>
            </SignedIn>
            <SignedOut>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate('/auth/login'), setMobileVisible(false)
                }}
              >
                Conecteaza-te
              </Button>
            </SignedOut>
          </div>
        </div>

        <div className="header__body">
          <div className="header__links">
            {siteMap.map((link) => {
              return (
                <label
                  key={link.link}
                  className="header__link"
                  onClick={() => navigate(link.link)}
                >
                  {link.title}
                </label>
              )
            })}
            <SignedIn>
              <label
                className="header__link"
                onClick={() => navigate('/myprofile')}
              >
                Profilul meu
              </label>
            </SignedIn>
          </div>

          <div className="header__account">
            <SignedIn>
              <label className="account__name">
                <span>Salut,</span> <span>{currentUser?.email + ''}</span>
              </label>
              <Button
                variant="contained"
                onClick={() => signOut()}
                color="primary"
              >
                Deconecteza-te
              </Button>
            </SignedIn>
            <SignedOut>
              <Button
                color="primary"
                variant="contained"
                onClick={() => navigate('/auth/login')}
              >
                Conecteaza-te
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  )
}
