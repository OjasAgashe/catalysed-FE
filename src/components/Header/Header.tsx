import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { Logo } from "../../assets/Illustrations/Illustrations";
import { HOME, LOGIN, ORGANISATION_HOME } from "../../constants/Routes";
import { useAuth } from "../../api_context/AuthContext";
import { ORGANISER } from "../../constants/Entities";
import OrgHomeHeader from "./OrgHomeHeader";
import CommonHomeHeader from "./CommonHomeHeader";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    const date = new Date(0).toUTCString();
    document.cookie = `catalysedCreated=;${date}`;
    document.cookie = `catalysedToken=;${date}`;
    document.cookie = `catalysedType=;${date}`;

    setCurrentUser({
      catalysedCreated: false,
      catalysedToken: "",
      catalysedType: "",
    });

    history.push(HOME);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="Navbar">
      <Navbar.Brand
        as={Link}
        to={
          currentUser.catalysedToken === "" ||
          currentUser.catalysedCreated === false
            ? HOME
            : currentUser.catalysedType === ORGANISER
            ? ORGANISATION_HOME
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
          {currentUser.catalysedToken === "" && <CommonHomeHeader />}

          {currentUser.catalysedCreated &&
            currentUser.catalysedType === ORGANISER && <OrgHomeHeader />}

          {currentUser.catalysedToken ? (
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
