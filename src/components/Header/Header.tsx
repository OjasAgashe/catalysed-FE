import React, { useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Logo } from "../../assets/Illustrations/Illustrations";
import {
  HOME,
  LOGIN,
  MENTOR_HOME,
  ORGANISATION_HOME,
  STUDENT_HOME,
} from "../../constants/Routes";
import { useCookie } from "../../context/cookie_context/CookieContext";
import { MENTOR, ORGANISER, STUDENT } from "../../constants/Entities";
import OrgHomeHeader from "./OrgHomeHeader";
import CommonHomeHeader from "./CommonHomeHeader";
import StudentHomeHeader from "./StudentHomeHeader";
import MentorHomeHeader from "./MentorHomeHeader";

const Header = () => {
  const location = useLocation();

  /*
   * Whenever the path changes, we will render Header again
   *
   * We are doing this, so that Header gets update based on the current
   * situation, either it is logged in or logged out
   */
  useEffect(() => {}, [location.pathname]);

  const {
    setAllCookies,
    getCatalysedTokenCookie,
    getCatalysedCreatedCookie,
    getCatalysedTypeCookie,
  } = useCookie();
  const history = useHistory();

  // Function to handle Click on Sign Out
  const handleSignOut = () => {
    // set All Cookies to empty
    setAllCookies(false, null, "", "", "", "", null);

    // and push to Common Home
    history.push(HOME);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="Navbar">
      {/*
       * Based on the cookie value, change the Link route of the
       * Brand
       */}
      <Navbar.Brand
        as={Link}
        to={
          getCatalysedTokenCookie() === "" ||
          getCatalysedCreatedCookie() === false
            ? HOME
            : getCatalysedTypeCookie() === ORGANISER
            ? ORGANISATION_HOME
            : getCatalysedTypeCookie() === STUDENT
            ? STUDENT_HOME
            : getCatalysedTypeCookie() === MENTOR
            ? MENTOR_HOME
            : "#"
        }
        className="NavbarBrand"
      >
        <img src={Logo} className="NavbarBrandLogo" alt="brand logo" />
        &nbsp;<span className="NavbarBrandText">CatalysEd</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav"></Navbar.Toggle>

      <Navbar.Collapse className="NavbarCollapse" id="navbar-nav">
        <Nav>
          {/*
           * Based on the value of cookies, Show either
           * CommonHomeHeader: if no one has logged in,
           * OrgHomeHeader: if logged in user is an Org,
           * StudentHomeHeader: if logged in user is a Student,
           * MentorHomeHeader: if logged in user is a Mentor
           */}

          {getCatalysedTokenCookie() === "" && <CommonHomeHeader />}

          {getCatalysedCreatedCookie() &&
            getCatalysedTypeCookie() === ORGANISER && <OrgHomeHeader />}

          {getCatalysedCreatedCookie() &&
            getCatalysedTypeCookie() === STUDENT && <StudentHomeHeader />}

          {getCatalysedCreatedCookie() &&
            getCatalysedTypeCookie() === MENTOR && <MentorHomeHeader />}

          {/*
           * Don't show the Sign Out button, if no one has logged in.
           *
           * Else show it
           */}
          {getCatalysedTokenCookie() ? (
            <Nav.Link
              className="NavbarCollapseNavItem SignOutBtn"
              as="button"
              onClick={handleSignOut}
              eventKey="10"
            >
              Sign Out
            </Nav.Link>
          ) : (
            <Nav.Link
              className="NavbarCollapseNavItem"
              as={Link}
              to={LOGIN}
              eventKey="10"
            >
              Log In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
