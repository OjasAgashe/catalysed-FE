import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  MENTOR_SUGGESTED_PROGRAMS,
  STUDENT_SUGGESTED_PROGRAMS,
} from "../../constants/Routes";

type SectionThreeErrorDivProps = {
  entity: string;
};

const SectionThreeErrorDiv = ({ entity }: SectionThreeErrorDivProps) => {
  return (
    <Alert variant="danger" className="ErrorNoProgramsDiv">
      Sorry !! You have no Programs,&nbsp;&nbsp;
      <Link
        to={
          entity === STUDENT
            ? STUDENT_SUGGESTED_PROGRAMS
            : entity === MENTOR
            ? MENTOR_SUGGESTED_PROGRAMS
            : ""
        }
      >
        Apply New Now
      </Link>
    </Alert>
  );
};

export default SectionThreeErrorDiv;
