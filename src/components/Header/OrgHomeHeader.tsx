import React from "react";
import { Nav } from "react-bootstrap";
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

      <Nav.Link
        as={Link}
        to={ORGANISATION_PROGRAM_CREATE}
        className="NavbarCollapseNavItem"
        eventKey="2"
      >
        Program
      </Nav.Link>
    </>
  );
};

export default OrgHomeHeader;
