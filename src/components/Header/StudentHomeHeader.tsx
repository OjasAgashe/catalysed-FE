import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  STUDENT_DASHBOARD,
  STUDENT_HOME,
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
        to={STUDENT_DASHBOARD}
        className="NavbarCollapseNavItem"
        eventKey="2"
      >
        Dashboard
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={`${STUDENT_UPDATES}?view=PROGRAMS`}
        className="NavbarCollapseNavItem"
        eventKey="3"
      >
        Updates
      </Nav.Link>
      <Nav.Link
        as={Link}
        to={STUDENT_SUGGESTED_PROGRAMS}
        className="NavbarCollapseNavItem"
        eventKey="4"
      >
        Programs
      </Nav.Link>
    </>
  );
};

export default StudentHomeHeader;
