import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  MENTOR_HOME,
  MENTOR_PROFILE_EDIT,
  MENTOR_SUGGESTED_PROGRAMS,
  MENTOR_UPDATES,
} from "../../constants/Routes";

const MentorHomeHeader = () => {
  return (
    <>
      <Nav.Link
        as={Link}
        to={MENTOR_HOME}
        className="NavbarCollapseNavItem"
        eventKey="1"
      >
        Home
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={`${MENTOR_UPDATES}?view=PROGRAMS`}
        className="NavbarCollapseNavItem"
        eventKey="2"
      >
        Updates
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={MENTOR_SUGGESTED_PROGRAMS}
        className="NavbarCollapseNavItem"
        eventKey="3"
      >
        Programs
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={MENTOR_PROFILE_EDIT}
        className="NavbarCollapseNavItem"
        eventKey="4"
      >
        Manage Profile
      </Nav.Link>
    </>
  );
};

export default MentorHomeHeader;
