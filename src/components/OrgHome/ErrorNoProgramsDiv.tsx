import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ORGANISATION_PROGRAM_CREATE } from "../../constants/Routes";

const ErrorNoProgramsDiv = () => {
  return (
    <Alert variant="danger" className="ErrorNoProgramsDiv">
      Sorry !! You have no Programs,&nbsp;&nbsp;
      <Link to={ORGANISATION_PROGRAM_CREATE}>Create New Now</Link>.
    </Alert>
  );
};

export default ErrorNoProgramsDiv;
