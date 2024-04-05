import React from 'react'
import Header from '../header/Header'
import './Layout.scss'


const Layout = ({children}) => {
  return (
   
    <>
       <div className="block md:hidden">
        <Header />
      </div>
        <div className="main-content">
               {children}
        </div>
     </>
  )
}

export default Layout
