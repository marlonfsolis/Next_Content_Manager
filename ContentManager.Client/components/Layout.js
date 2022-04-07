import React from 'react'
import Navbar from 'components/Navbar';
import Footer from "components/Footer";


const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100 box-red">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
