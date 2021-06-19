import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { ProfileBuilderProvider } from "../../context/api_context/ProfileBuilderContext";
import { MENTOR, ORGANISER, STUDENT } from "../../constants/Entities";
import {
  LOGIN,
  MENTOR_HOME,
  MENTOR_PROFILE_BUILDER,
  ORGANISATION_DIRECTORY,
  ORGANISATION_DIRECTORY_DETAILS_MENTOR,
  ORGANISATION_DIRECTORY_DETAILS_STUDENT,
  ORGANISATION_HOME,
  ORGANISATION_PROFILE_BUILDER,
  ORGANISATION_PROGRAM_CREATE,
  ORGANISATION_PROGRAM_DETAILS,
  ORGANISATION_PROGRAM_EDIT,
  ORGANISATION_PROGRAM_INVITATIONS,
  ORGANISATION_PROGRAM_PARTICIPANTS,
  ORGANISATION_PROGRAM_VIEW_SEARCH,
  STUDENT_HOME,
  STUDENT_PROFILE_BUILDER,
} from "../../constants/Routes";
import MentorProfileBuilder from "../../pages/MentorProfileBuilder/MentorProfileBuilder";
import OrgProfileBuilder from "../../pages/OrgProfileBuilder/OrgProfileBuilder";
import StuProfileBuilder from "../../pages/StuProfileBuilder/StuProfileBuilder";
import { useCookie } from "../../context/cookie_context/CookieContext";

const PrivateRoute = (props: {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}): JSX.Element => {
  const {
    getCatalysedTokenCookie,
    getCatalysedTypeCookie,
    getCatalysedCreatedCookie,
  } = useCookie();
  const location = useLocation();

  const validatedRender = (
    catalysedType: string,
    catalysedCreated: boolean
  ) => {
    if (catalysedType === ORGANISER) {
      if (catalysedCreated) {
        if (
          [
            ORGANISATION_DIRECTORY,
            `${ORGANISATION_DIRECTORY_DETAILS_MENTOR}/:mentorId`,
            `${ORGANISATION_DIRECTORY_DETAILS_STUDENT}/:studentId`,
            ORGANISATION_HOME,
            ORGANISATION_PROGRAM_CREATE,
            `${ORGANISATION_PROGRAM_DETAILS}/:programId`,
            `${ORGANISATION_PROGRAM_EDIT}/:programId`,
            `${ORGANISATION_PROGRAM_INVITATIONS}/:programId`,
            `${ORGANISATION_PROGRAM_PARTICIPANTS}/:programId`,
            `${ORGANISATION_PROGRAM_VIEW_SEARCH}/:filterBy`,
          ].includes(props.path)
        ) {
          return (
            <Route path={props.path} exact={props.exact ?? false}>
              {props.children}
            </Route>
          );
        } else {
          return <Redirect to={ORGANISATION_HOME} />;
        }
      } else {
        if (location.pathname !== ORGANISATION_PROFILE_BUILDER) {
          return <Redirect to={ORGANISATION_PROFILE_BUILDER} />;
        } else {
          return (
            <ProfileBuilderProvider>
              <Route path={ORGANISATION_PROFILE_BUILDER}>
                <OrgProfileBuilder />
              </Route>
            </ProfileBuilderProvider>
          );
        }
      }
    }

    if (catalysedType === STUDENT) {
      if (catalysedCreated) {
        if ([STUDENT_HOME].includes(props.path)) {
          return (
            <Route path={props.path} exact={props.exact ?? false}>
              {props.children}
            </Route>
          );
        } else {
          return <Redirect to={STUDENT_HOME} />;
        }
      } else {
        if (location.pathname !== STUDENT_PROFILE_BUILDER) {
          return <Redirect to={STUDENT_PROFILE_BUILDER} />;
        } else {
          return (
            <ProfileBuilderProvider>
              <Route path={STUDENT_PROFILE_BUILDER}>
                <StuProfileBuilder />
              </Route>
            </ProfileBuilderProvider>
          );
        }
      }
    }

    if (catalysedType === MENTOR) {
      if (catalysedCreated) {
        if ([MENTOR_HOME].includes(props.path)) {
          return (
            <Route path={props.path} exact={props.exact ?? false}>
              {props.children}
            </Route>
          );
        } else {
          return <Redirect to={MENTOR_HOME} />;
        }
      } else {
        if (location.pathname !== MENTOR_PROFILE_BUILDER) {
          return <Redirect to={MENTOR_PROFILE_BUILDER} />;
        } else {
          return (
            <ProfileBuilderProvider>
              <Route path={MENTOR_PROFILE_BUILDER}>
                <MentorProfileBuilder />
              </Route>
            </ProfileBuilderProvider>
          );
        }
      }
    }

    return <Redirect to={LOGIN} />;
  };

  return getCatalysedTokenCookie() ? (
    validatedRender(getCatalysedTypeCookie(), getCatalysedCreatedCookie())
  ) : (
    <Redirect to={LOGIN} />
  );
};

export default PrivateRoute;
