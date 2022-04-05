import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveLink from "./ActionLink";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

export default () => {
  const router = useRouter();

  // const getLinkClasses = (path, exact = false) => {
  //   let routePath = "";
  //   routePath = router.asPath || "";
  //   console.log(routePath);

  //   let classes = "navbar-item is-size-5 has-text-weight-semibold";
  //   if (exact) {
  //     if (path === routePath) {
  //       classes = classes.concat(" is-active");
  //     }
  //   } else if (routePath.startsWith(path)) {
  //     classes = classes.concat(" is-active");
  //   }
  //   return classes;
  // }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand><Link href="/">Content Manager</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="">
              <ActiveLink href="/home" type="navLink" exact={true}>Home</ActiveLink>
              <ActiveLink href="/home/about" type="navLink">About</ActiveLink>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <ActiveLink href="/home/about" type="dropdownItem">About</ActiveLink>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      {/** Old Bulma code */}

      {/* <nav className="navbar is-dark" role="navigation">
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
              <ActiveLink href={"/resources/add"}>Add</ActiveLink>
              <ActiveLink href={"/home/about"}>About</ActiveLink>
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
};

