import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import logo from "../../assets/images/bee.png";

function Header() {
  return (
    <Navbar
      bg="lght"
      expand="md"
      className="left-0"
      style={{ backgroundColor: "#F2C94C" }}
    >
      <Navbar.Brand href="/homepage">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            height="30"
            className="d-inline-block align-top me-2"
            alt="ThinkerBee Logo"
          />

          <h3 className="d-inline-block mb-0">
            <span className="text-decoration-none" style={{ color: "#073B4C" }}>
              ThinkerBee
            </span>
          </h3>
        </div>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto" style={{ color: "#073B4C" }}>
          <Nav.Link href="/coursesmain">Courses</Nav.Link>
          <Nav.Link href="/homepage#about-us">About</Nav.Link>
          <Nav.Link href="/homepage#contact-us">Contact</Nav.Link>
        </Nav>
        <Form className="d-flex mx-auto me-3">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            style={{ width: "400px", borderRadius: "20px" }}
          />
          <Button variant="outline-secondary" style={{ borderRadius: "20px" }}>
            Search
          </Button>
        </Form>
        <div className="d-flex">
          <Button
            href="/login"
            variant="outline-secondary"
            className="me-2 mx-2"
            style={{ borderRadius: "20px" }}
          >
            Login
          </Button>

          <Button
            href="/register"
            variant="outline-secondary"
            className="me-2 mx-2"
            style={{ borderRadius: "20px" }}
          >
            {" "}
            Register
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
