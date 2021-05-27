import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import {
  MENTOR_HOME,
  MENTOR_PROFILE_BUILDER,
  ORGANISATION_HOME,
  ORGANISATION_PROFILE_BUILDER,
  STUDENT_HOME,
  STUDENT_PROFILE_BUILDER,
} from "../../constants/Routes";
import { MENTOR, ORGANISER, STUDENT } from "../../constants/Entities";
import { useCookie } from "../../context/cookie_context/CookieContext";

const PublicRoute = (props: {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}) => {
  const { getCatalysedTypeCookie, getCatalysedCreatedCookie } = useCookie();
  const history = useHistory();

  useEffect(() => {
    switch (getCatalysedTypeCookie()) {
      case ORGANISER:
        if (getCatalysedCreatedCookie()) {
          history.push(ORGANISATION_HOME);
        } else if (getCatalysedCreatedCookie() === false) {
          history.push(ORGANISATION_PROFILE_BUILDER);
        }

        break;
      case STUDENT:
        if (getCatalysedCreatedCookie()) {
          history.push(STUDENT_HOME);
        } else if (getCatalysedCreatedCookie() === false) {
          history.push(STUDENT_PROFILE_BUILDER);
        }

        break;
      case MENTOR:
        if (getCatalysedCreatedCookie()) {
          history.push(MENTOR_HOME);
        } else if (getCatalysedCreatedCookie() === false) {
          history.push(MENTOR_PROFILE_BUILDER);
        }

        break;
    }
  }, [getCatalysedCreatedCookie, getCatalysedTypeCookie, history]);

  return (
    <Route path={props.path} exact={props.exact ?? false}>
      {props.children}
    </Route>
  );
};

export default PublicRoute;
