import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "../../api_context/AuthContext";
import { MENTOR, ORGANISER, STUDENT } from "../../constants/Entities";
import {
  LOGIN,
  MENTOR_HOME,
  MENTOR_PROFILE_BUILDER,
  ORGANISATION_HOME,
  ORGANISATION_PROFILE_BUILDER,
  ORGANISATION_PROGRAM_CREATE,
  STUDENT_HOME,
  STUDENT_PROFILE_BUILDER,
} from "../../constants/Routes";
import MentorProfileBuilder from "../../pages/MentorProfileBuilder/MentorProfileBuilder";
import OrgProfileBuilder from "../../pages/OrgProfileBuilder/OrgProfileBuilder";
import StuProfileBuilder from "../../pages/StuProfileBuilder/StuProfileBuilder";

const PrivateRoute = (props: {
  children: React.ReactNode;
  path: string;
}): JSX.Element => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const getTypeCreatedFromCookie = () => {
    let catalysedType: string = "";
    let catalysedCreated: boolean = false;

    document.cookie.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("=");

      if (name.trim() === "catalysedType") {
        catalysedType = value;
      } else if (name.trim() === "catalysedCreated") {
        value === "true"
          ? (catalysedCreated = true)
          : (catalysedCreated = false);
      }
    });
    return validatedRender(catalysedType, catalysedCreated);
  };

  const validatedRender = (
    catalysedType: string,
    catalysedCreated: boolean
  ) => {
    if (catalysedType === ORGANISER) {
      if (catalysedCreated) {
        if (
          [ORGANISATION_HOME, ORGANISATION_PROGRAM_CREATE].includes(props.path)
        ) {
          return <Route path={props.path}>{props.children}</Route>;
        } else {
          return <Redirect to={ORGANISATION_HOME} />;
        }
      }

      if (location.pathname !== ORGANISATION_PROFILE_BUILDER) {
        return <Redirect to={ORGANISATION_PROFILE_BUILDER} />;
      } else {
        return (
          <Route path={ORGANISATION_PROFILE_BUILDER}>
            <OrgProfileBuilder />
          </Route>
        );
      }
    }

    if (catalysedType === STUDENT) {
      if (catalysedCreated) {
        if ([STUDENT_HOME].includes(props.path)) {
          return <Route path={props.path}>{props.children}</Route>;
        } else {
          return <Redirect to={STUDENT_HOME} />;
        }
      }

      if (location.pathname !== STUDENT_PROFILE_BUILDER) {
        return <Redirect to={STUDENT_PROFILE_BUILDER} />;
      } else {
        return (
          <Route path={STUDENT_PROFILE_BUILDER}>
            <StuProfileBuilder />
          </Route>
        );
      }
    }

    if (catalysedType === MENTOR) {
      if (catalysedCreated) {
        if ([MENTOR_HOME].includes(props.path)) {
          return <Route path={props.path}>{props.children}</Route>;
        } else {
          return <Redirect to={MENTOR_HOME} />;
        }
      }

      if (location.pathname !== MENTOR_PROFILE_BUILDER) {
        return <Redirect to={MENTOR_PROFILE_BUILDER} />;
      } else {
        return (
          <Route path={MENTOR_PROFILE_BUILDER}>
            <MentorProfileBuilder />
          </Route>
        );
      }
    }

    return <Redirect to={LOGIN} />;
  };

  return currentUser.catalysedToken ? (
    validatedRender(currentUser.catalysedType, currentUser.catalysedCreated)
  ) : document.cookie ? (
    getTypeCreatedFromCookie()
  ) : (
    <Redirect to={LOGIN} />
  );
};

export default PrivateRoute;
