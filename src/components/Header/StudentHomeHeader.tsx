import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { STUDENT_DASHBOARD, STUDENT_HOME } from "../../constants/Routes";

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
    </>
  );
};

export default StudentHomeHeader;
