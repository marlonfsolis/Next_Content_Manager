import React from 'react'
import Navbar from 'components/Navbar';
import Footer from "components/Footer";


const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
