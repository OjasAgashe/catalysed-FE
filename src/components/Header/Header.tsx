import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import Logo from "../../assets/Illustrations/logo.png";

const Header = () => {
  return (
    <Navbar className="Navbar" expand="lg">
      {/* Change Navbar.Brand as Link to common homepage */}
      <Navbar.Brand className="NavbarBrand">
        <img src={Logo} className="NavbarBrandLogo" alt="brand logo" />
        &nbsp;<span className="NavbarBrandText">CatalysEd</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav"></Navbar.Toggle>

      <Navbar.Collapse className="NavbarCollapse" id="navbar-nav">
        <Nav>
          {/* Change Home as Link to common homepage */}
          <Nav.Link className="NavbarCollapseNavItem">Home</Nav.Link>

          <NavDropdown
            title="Ecosystem"
            id="Ecosystem-NavDropdown"
            className="NavbarCollapseNavItem"
          >
            {/* Change NavDropdown.Item as Link to respective pages */}
            <NavDropdown.Item>Organisations</NavDropdown.Item>
            <NavDropdown.Item>Programs</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Help Center"
            id="HelpCenter-NavDropdown"
            className="NavbarCollapseNavItem"
          >
            {/* Change NavDropdown.Item as Link to respective pages */}
            <NavDropdown.Item>How to get started</NavDropdown.Item>
            <NavDropdown.Item>In-depth guide</NavDropdown.Item>
          </NavDropdown>

          {/* Change FAQ as Link to FAQ page */}
          <Nav.Link className="NavbarCollapseNavItem">FAQ</Nav.Link>

          <NavDropdown
            title="Register"
            id="Register-NavDropdown"
            className="NavbarCollapseNavItem"
          >
            {/* Change NavDropdown.Item as Link to respective pages */}
            <NavDropdown.Item>Organiser</NavDropdown.Item>
            <NavDropdown.Item>Mentor</NavDropdown.Item>
            <NavDropdown.Item>Student</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link className="NavbarCollapseNavItem">Log In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
