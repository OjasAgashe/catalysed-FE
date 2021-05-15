import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/Illustrations/Illustrations";
import {
  HOME,
  LOGIN,
  ORGANISATION_REGISTER,
  STUDENT_MENTOR_REGISTER,
} from "../../routes/Routes";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="Navbar">
      <Navbar.Brand as={Link} to={HOME} className="NavbarBrand">
        <img src={Logo} className="NavbarBrandLogo" alt="brand logo" />
        &nbsp;<span className="NavbarBrandText">CatalysEd</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav"></Navbar.Toggle>

      <Navbar.Collapse className="NavbarCollapse" id="navbar-nav">
        <Nav>
          <Nav.Link
            as={Link}
            to={HOME}
            className="NavbarCollapseNavItem"
            eventKey="1"
          >
            Home
          </Nav.Link>

          <NavDropdown
            title="Ecosystem"
            id="Ecosystem-NavDropdown"
            className="NavbarCollapseNavItem"
          >
            {/* Change NavDropdown.Item as Link to respective pages */}
            <NavDropdown.Item eventKey="2">Organisations</NavDropdown.Item>
            <NavDropdown.Item eventKey="3">Programs</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Help Center"
            id="HelpCenter-NavDropdown"
            className="NavbarCollapseNavItem"
          >
            {/* Change NavDropdown.Item as Link to respective pages */}
            <NavDropdown.Item eventKey="4">How to get started</NavDropdown.Item>
            <NavDropdown.Item eventKey="5">In-depth guide</NavDropdown.Item>
          </NavDropdown>

          {/* Change FAQ as Link to FAQ page */}
          <Nav.Link className="NavbarCollapseNavItem" eventKey="6">
            FAQ
          </Nav.Link>

          <NavDropdown
            title="Register"
            id="Register-NavDropdown"
            className="NavbarCollapseNavItem"
          >
            <NavDropdown.Item as={Link} to={ORGANISATION_REGISTER} eventKey="7">
              Organiser
            </NavDropdown.Item>

            <NavDropdown.Item
              as={Link}
              to={STUDENT_MENTOR_REGISTER}
              eventKey="8"
            >
              Mentor
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to={STUDENT_MENTOR_REGISTER}
              eventKey="9"
            >
              Student
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link
            className="NavbarCollapseNavItem"
            as={Link}
            to={LOGIN}
            eventKey="10"
          >
            Log In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
