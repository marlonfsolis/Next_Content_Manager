import React from "react";
import Link from 'next/link'
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const getLinkClasses = (path, exact = true) => {
    let routePath = "";
    routePath = router.asPath || "";
    // console.log(router.asPath);
    
    let classes = "navbar-item is-size-5 has-text-weight-semibold";
    if ( exact && path === routePath) {
      classes = classes.concat(" is-active");
    } else if (routePath.startsWith(path)) {
      classes = classes.concat(" is-active");
    } 
    return classes;
  }
  
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
                <a className={getLinkClasses("/home")}>
                  Home
                </a>
              </Link>
              <Link href="/home/about" passHref>
                <a className={getLinkClasses("/home/about")}>
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
