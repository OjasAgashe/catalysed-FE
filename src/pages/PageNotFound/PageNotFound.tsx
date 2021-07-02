import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Logo } from "../../assets/Illustrations/Illustrations";
import { MENTOR, ORGANISER, STUDENT } from "../../constants/Entities";
import {
  HOME,
  MENTOR_HOME,
  ORGANISATION_HOME,
  STUDENT_HOME,
} from "../../constants/Routes";
import { useCookie } from "../../context/cookie_context/CookieContext";
import "./PageNotFound.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const PageNotFound = () => {
  const {
    getCatalysedTokenCookie,
    getCatalysedCreatedCookie,
    getCatalysedTypeCookie,
  } = useCookie();
  const history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Page Not Found | CatalysEd";
  }, []);

  const handleBackToHomeClick = () => {
    if (
      getCatalysedTokenCookie() === "" ||
      getCatalysedCreatedCookie() === false
    ) {
      history.push(HOME);
    } else {
      switch (getCatalysedTypeCookie()) {
        case ORGANISER:
          history.push(ORGANISATION_HOME);
          break;

        case STUDENT:
          history.push(STUDENT_HOME);
          break;

        case MENTOR:
          history.push(MENTOR_HOME);
          break;
      }
    }
  };

  return (
    <div className="PageNotFoundContainer">
      <div className="PageNotFoundSectionOne">
        <img src={Logo} alt="brand logo" />
      </div>
      <div className="PageNotFoundSectionTwo">
        <span>This page doesn't exist</span>
        <br />
        <small>
          ...maybe the page you're looking for is not found or never existed.
        </small>
      </div>
      <div className="PageNotFoundSectionThree">
        <button onClick={handleBackToHomeClick} className="BackToHomeBtn">
          <HiOutlineArrowNarrowLeft className="BackToHomeBtnIcon" /> Back to
          Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
