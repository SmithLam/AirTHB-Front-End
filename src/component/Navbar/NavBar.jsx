import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function NavBar(props) {
  let history = useHistory();

  // const goHome = (event) => {
  //   event.preventDefault();
  //   history.push("/");
  // };

  // const goLoginIn = (event) => {
  //   event.preventDefault();
  //   history.push("/login");
  // };

  const goMyProfile = (event) => {
    event.preventDefault();
    history.push("/profile");
  };

  const createExp = (event) => {
    event.preventDefault();
    history.push("/experiences/create");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand>
            <a href="/">
              <img
                alt="AirBNB"
                src="https://cdn.iconscout.com/icon/free/png-256/airbnb-1869032-1583156.png"
                width="50px"
                height="50px"
              ></img>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link href="/">Host your home</Nav.Link>
              <Nav.Link onClick={(event) => createExp(event)}>
                Host an experience
              </Nav.Link>
              <Nav.Link>Help</Nav.Link>
              {props.user ? (
                <Nav.Link
                  style={{ marginRight: "10px" }}
                  onClick={(event) => props.logOut(event)}
                >
                  Log Out
                </Nav.Link>
              ) : (
                <Nav.Link
                  style={{ marginRight: "10px" }}
                  onClick={(event) => props.handleShow(event)}
                >
                  Log In
                </Nav.Link>
              )}
              <Nav.Link
                style={{ marginRight: "10px" }}
                onClick={(event) => goMyProfile(event)}
              >
                My Profile
              </Nav.Link>
              <Button variant="light">Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
