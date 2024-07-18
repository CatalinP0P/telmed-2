import React from 'react'
import './pageLayout.Module.scss'
import Header from '../header/header'
import { ToastContainer } from 'react-toastify'
import Footer from '../footer/footer'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'utils/theme'

interface pageLayoutProps {
  children?: React.ReactNode
}

export default function PageLayout({ children }: pageLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className="pageLayout">
        <Header />
        <div className="pageLayout__body">{children}</div>
        <Footer />
        <ToastContainer />
      </div>
    </ThemeProvider>
  )
}
