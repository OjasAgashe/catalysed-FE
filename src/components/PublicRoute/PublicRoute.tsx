import React, { useEffect } from "react";
import { useAuth } from "../../api_context/AuthContext";
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

const PublicRoute = (props: {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}) => {
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    switch (currentUser.catalysedType) {
      case ORGANISER:
        if (currentUser.catalysedCreated) {
          history.push(ORGANISATION_HOME);
        } else if (currentUser.catalysedCreated === false) {
          history.push(ORGANISATION_PROFILE_BUILDER);
        }

        break;
      case STUDENT:
        if (currentUser.catalysedCreated) {
          history.push(STUDENT_HOME);
        } else if (currentUser.catalysedCreated === false) {
          history.push(STUDENT_PROFILE_BUILDER);
        }

        break;
      case MENTOR:
        if (currentUser.catalysedCreated) {
          history.push(MENTOR_HOME);
        } else if (currentUser.catalysedCreated === false) {
          history.push(MENTOR_PROFILE_BUILDER);
        }

        break;
    }
  }, [currentUser.catalysedCreated, currentUser.catalysedType, history]);

  return (
    <Route path={props.path} exact={props.exact ?? false}>
      {props.children}
    </Route>
  );
};

export default PublicRoute;
