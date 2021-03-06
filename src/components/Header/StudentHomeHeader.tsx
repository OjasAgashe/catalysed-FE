import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  STUDENT_HOME,
  STUDENT_PROFILE_EDIT,
  STUDENT_SUGGESTED_PROGRAMS,
  STUDENT_UPDATES,
} from "../../constants/Routes";

const StudentHomeHeader = () => {
  return (
    <>
      <Nav.Link
        as={Link}
        to={STUDENT_HOME}
        className="NavbarCollapseNavItem"
        eventKey="1"
      >
        Home
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={`${STUDENT_UPDATES}?view=PROGRAMS`}
        className="NavbarCollapseNavItem"
        eventKey="2"
      >
        Updates
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={STUDENT_SUGGESTED_PROGRAMS}
        className="NavbarCollapseNavItem"
        eventKey="3"
      >
        Programs
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={STUDENT_PROFILE_EDIT}
        className="NavbarCollapseNavItem"
        eventKey="4"
      >
        Manage Profile
      </Nav.Link>
    </>
  );
};

export default StudentHomeHeader;
