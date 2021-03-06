import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ORGANISATION_APPLICANTS,
  ORGANISATION_DIRECTORY,
  ORGANISATION_HOME,
  ORGANISATION_INVITATIONS,
  ORGANISATION_PROFILE_EDIT,
  ORGANISATION_PROGRAM_CREATE,
  ORGANISATION_PROGRAM_VIEW_SEARCH,
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
          Create
        </NavDropdown.Item>

        <NavDropdown.Item
          as={Link}
          to={`${ORGANISATION_PROGRAM_VIEW_SEARCH}/all`}
          eventKey="3"
        >
          View/Search All
        </NavDropdown.Item>

        <NavDropdown.Item
          as={Link}
          to={`${ORGANISATION_DIRECTORY}?type=MENTOR`}
          eventKey="4"
        >
          Directory
        </NavDropdown.Item>

        <NavDropdown.Item
          as={Link}
          to={`${ORGANISATION_PROFILE_EDIT}`}
          eventKey="5"
        >
          Manage Profile
        </NavDropdown.Item>

        <NavDropdown.Item
          as={Link}
          to={`${ORGANISATION_INVITATIONS}`}
          eventKey="6"
        >
          Invitations
        </NavDropdown.Item>

        <NavDropdown.Item
          as={Link}
          to={`${ORGANISATION_APPLICANTS}`}
          eventKey="7"
        >
          Applicants
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default OrgHomeHeader;
