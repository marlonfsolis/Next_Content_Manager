import React from 'react'
import Navbar from 'components/Navbar';
import Footer from "components/Footer";
import { ToastContainer } from "react-toastify";


const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      {children}
      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={20000}
        hideProgressBar={true}
        closeOnClick
        theme={"colored"}
      />
    </div>
  )
}

export default Layout
