import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({children}) {
  return (
    <div>
      <Navbar/>
      <div className="main-content min-h-screen">
      {children}
      </div>
      <Footer/>
    </div>
  )
}