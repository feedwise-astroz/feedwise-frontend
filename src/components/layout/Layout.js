import React from 'react'
import Header from '../header/Header'
import './Layout.scss'


const Layout = ({children}) => {
  return (
<div className="layout">
      <Header />
      <div className="main-content">
        {children}
      </div>
    </div>
  )
}

export default Layout
