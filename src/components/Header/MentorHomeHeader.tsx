import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MENTOR_HOME, MENTOR_UPDATES } from "../../constants/Routes";

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
    </>
  );
};

export default MentorHomeHeader;