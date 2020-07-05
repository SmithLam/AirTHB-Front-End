import React from "react";
import { Navbar, NavDropdown, Nav, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function NavBar(props) {
  let history = useHistory();

  const goHome = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const createExp = (event) => {
    event.preventDefault();
    history.push("/experiences/create");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <a onClick={(event) => goHome(event)}>
              <img
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
              <Nav.Link>Host your home</Nav.Link>
              <Nav.Link onClick={(event) => createExp(event)}>
                Host an experience
              </Nav.Link>
              <Nav.Link>Help</Nav.Link>
              <Nav.Link style={{ marginRight: "10px" }}>Log In</Nav.Link>
              <Button variant="light">Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
