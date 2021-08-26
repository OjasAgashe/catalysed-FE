/*
 * We will render this page whenever anyone tries to visit
 * an URL that is not valid, or tries to visit a page which
 * does not exist any more
 */

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
    /*
     * Whenever anyone visits this page first time,
     * We want the scroll bar position on the top
     */
    document.documentElement.scrollTop = 0;

    // set document title
    document.title = "Page Not Found | CatalysEd";
  }, []);

  /*
   * Back to Home button click handler
   */
  const handleBackToHomeClick = () => {
    /*
     * if the user is not logged in, then redirect to Common Home
     */
    if (
      getCatalysedTokenCookie() === "" ||
      getCatalysedCreatedCookie() === false
    ) {
      history.push(HOME);
    } else {
      /*
       * else redirect to respected Home for the Organisation,
       * Student, and Mentor based on CatalysedType Cookie
       */
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
    <div className="PageNotFoundContainer Page">
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
