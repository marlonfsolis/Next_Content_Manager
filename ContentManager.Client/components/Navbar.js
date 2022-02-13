import React from "react";
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="../">
              <h1 className="is-size-4 is-uppercase">
                <Link href="/">Content Manager</Link>
              </h1>
            </a>
            <span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item is-active is-size-5 has-text-weight-semibold">
                <Link href="/">Home</Link>                
              </div>
              <div className="navbar-item is-size-5 has-text-weight-semibold">
                <Link href="/about">About</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
