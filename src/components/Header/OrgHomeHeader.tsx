import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ORGANISATION_HOME,
  ORGANISATION_PROGRAM_CREATE,
} from "../../constants/Routes";

const OrgHomeHeader = () => {
  return (
    <>
      <Nav.Link
        as={Link}
        to={ORGANISATION_HOME}
        className="NavbarCollapseNavItem"
        eventKey="1"
      >
        Home
      </Nav.Link>

      <NavDropdown
        title="Program"
        id="Program-NavDropdown"
        className="NavbarCollapseNavItem"
      >
        <NavDropdown.Item
          as={Link}
          to={ORGANISATION_PROGRAM_CREATE}
          eventKey="2"
        >
          Create Program
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default OrgHomeHeader;
