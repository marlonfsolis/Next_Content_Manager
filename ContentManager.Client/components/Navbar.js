import React from "react";
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
      <nav className="navbar is-dark" role="navigation">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <h1 className="is-size-4 is-uppercase">
                <Link href="/">Content Manager</Link>
              </h1>
            </div>
            <span role="button" className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <Link href="/" passHref>
                <a className="navbar-item is-active is-size-5 has-text-weight-semibold">
                  Home
                </a>
              </Link>
              <Link href="/about" passHref>
                <a className="navbar-item is-size-5 has-text-weight-semibold">
                About
                </a>
              </Link>            
            </div>
          </div>
        </div>
      </nav>    
    </>
  );
};

export default Navbar;
