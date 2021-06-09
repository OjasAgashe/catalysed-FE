import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ORGANISATION_PROGRAM_EDIT } from "../../constants/Routes";

type ErrorNotPublishedDivProps = {
  programId: string;
};

const ErrorNotPublishedDiv = ({ programId }: ErrorNotPublishedDivProps) => {
  return (
    <Alert variant="danger" className="ErrorNotPublishedDiv">
      Want to send Invitation!!,&nbsp;&nbsp;
      <Link to={`${ORGANISATION_PROGRAM_EDIT}/${programId}`}>
        Publish the Program
      </Link>
      .
    </Alert>
  );
};

export default ErrorNotPublishedDiv;
