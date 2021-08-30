import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  HOME,
  INVITE_DEVELOPMENT,
  ORGANISATION_REGISTER,
  STUDENT_MENTOR_REGISTER,
} from "../../constants/Routes";

const CommonHomeHeader = () => {
  return (
    <>
      <Nav.Link
        as={Link}
        to={HOME}
        className="NavbarCollapseNavItem"
        eventKey="1"
      >
        Home
      </Nav.Link>

      {/* This is for Development only */}
      <Nav.Link
        as={Link}
        to={INVITE_DEVELOPMENT}
        className="NavbarCollapseNavItem"
        eventKey="11"
      >
        Invite
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

        <NavDropdown.Item as={Link} to={STUDENT_MENTOR_REGISTER} eventKey="8">
          Mentor
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={STUDENT_MENTOR_REGISTER} eventKey="9">
          Student
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default CommonHomeHeader;
