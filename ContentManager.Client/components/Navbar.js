import React from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import ActiveLink from "./ActionLink";

const Navbar = () => {
  const router = useRouter();

  const getLinkClasses = (path, exact = false) => {
    let routePath = "";
    routePath = router.asPath || "";
    console.log(routePath);
    
    let classes = "navbar-item is-size-5 has-text-weight-semibold";
    if ( exact) {
      if (path === routePath) {
        classes = classes.concat(" is-active"); 
      }
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
              <ActiveLink href={"/home"} exact={true}>Home</ActiveLink>
              <ActiveLink href={"/home/about"} exact={true}>About</ActiveLink>
              <ActiveLink href={"/home/otherpage"} exact={true}>otherpage</ActiveLink>
            </div>
          </div>
        </div>
      </nav>    
    </>
  );
};

export default Navbar;
