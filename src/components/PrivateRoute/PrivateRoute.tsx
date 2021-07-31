import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { ProfileBuilderProvider } from "../../context/api_context/ProfileBuilderContext";
import { MENTOR, ORGANISER, STUDENT } from "../../constants/Entities";
import {
  LOGIN,
  MENTOR_HOME,
  MENTOR_PROFILE_BUILDER,
  ORGANISATION_APPLICANTS,
  ORGANISATION_DIRECTORY_DETAILS_MENTOR,
  ORGANISATION_DIRECTORY_DETAILS_STUDENT,
  ORGANISATION_DIRECTORY,
  ORGANISATION_HOME,
  ORGANISATION_PROFILE_BUILDER,
  ORGANISATION_PROFILE_EDIT,
  ORGANISATION_PROGRAM_CREATE,
  ORGANISATION_PROGRAM_DETAILS,
  ORGANISATION_PROGRAM_VIEW_SEARCH,
  STUDENT_HOME,
  STUDENT_PROFILE_BUILDER,
  STUDENT_DASHBOARD,
  ORGANISATION_INVITATIONS,
  STUDENT_UPDATES,
  STUDENT_UPDATES_DETAILS_PROGRAM,
  STUDENT_UPDATES_DETAILS_ORGANISATION,
  MENTOR_UPDATES,
  MENTOR_UPDATES_DETAILS_ORGANISATION,
  MENTOR_UPDATES_DETAILS_PROGRAM,
  STUDENT_SUGGESTED_PROGRAMS,
  MENTOR_SUGGESTED_PROGRAMS,
  STUDENT_PROFILE_EDIT,
  MENTOR_PROFILE_EDIT,
  STUDENT_UPDATES_DETAILS_APPLICATION,
  MENTOR_UPDATES_DETAILS_APPLICATION,
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
            ORGANISATION_APPLICANTS,
            ORGANISATION_DIRECTORY,
            `${ORGANISATION_DIRECTORY_DETAILS_MENTOR}/:mentorId/details`,
            `${ORGANISATION_DIRECTORY_DETAILS_STUDENT}/:studentId/details`,
            ORGANISATION_HOME,
            ORGANISATION_INVITATIONS,
            ORGANISATION_PROFILE_EDIT,
            `${ORGANISATION_PROGRAM_DETAILS}/:programId/applicants`,
            `${ORGANISATION_PROGRAM_DETAILS}/:programId/applicants/mentor/application/:applicationId/details`,
            `${ORGANISATION_PROGRAM_DETAILS}/:programId/applicants/student/application/:applicationId/details`,
            ORGANISATION_PROGRAM_CREATE,
            `${ORGANISATION_PROGRAM_DETAILS}/:programId/details`,
            `${ORGANISATION_PROGRAM_DETAILS}/:programId/edit`,
            `${ORGANISATION_PROGRAM_DETAILS}/:programId/invitations`,
            `${ORGANISATION_PROGRAM_DETAILS}/:programId/participants`,
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
        if (
          [
            STUDENT_HOME,
            STUDENT_DASHBOARD,
            STUDENT_PROFILE_EDIT,
            STUDENT_SUGGESTED_PROGRAMS,
            `${STUDENT_SUGGESTED_PROGRAMS}/:programId/application`,
            `${STUDENT_SUGGESTED_PROGRAMS}/:programId/details`,
            STUDENT_UPDATES,
            `${STUDENT_UPDATES_DETAILS_APPLICATION}/:applicationId/details`,
            `${STUDENT_UPDATES_DETAILS_ORGANISATION}/:organisationId/details`,
            `${STUDENT_UPDATES_DETAILS_ORGANISATION}/:organisationId/programs`,
            `${STUDENT_UPDATES_DETAILS_PROGRAM}/:programId/dashboard`,
            `${STUDENT_UPDATES_DETAILS_PROGRAM}/:programId/details`,
            `${STUDENT_UPDATES_DETAILS_PROGRAM}/:programId/people`,
          ].includes(props.path)
        ) {
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
        if (
          [
            MENTOR_HOME,
            MENTOR_PROFILE_EDIT,
            MENTOR_SUGGESTED_PROGRAMS,
            `${MENTOR_SUGGESTED_PROGRAMS}/:programId/application`,
            `${MENTOR_SUGGESTED_PROGRAMS}/:programId/details`,
            MENTOR_UPDATES,
            `${MENTOR_UPDATES_DETAILS_APPLICATION}/:applicationId/details`,
            `${MENTOR_UPDATES_DETAILS_ORGANISATION}/:organisationId/details`,
            `${MENTOR_UPDATES_DETAILS_ORGANISATION}/:organisationId/programs`,
            `${MENTOR_UPDATES_DETAILS_PROGRAM}/:programId/dashboard`,
            `${MENTOR_UPDATES_DETAILS_PROGRAM}/:programId/details`,
            `${MENTOR_UPDATES_DETAILS_PROGRAM}/:programId/people`,
          ].includes(props.path)
        ) {
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
