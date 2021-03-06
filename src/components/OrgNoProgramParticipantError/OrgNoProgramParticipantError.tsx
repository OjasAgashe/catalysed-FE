import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ORGANISATION_PROGRAM_DETAILS } from "../../constants/Routes";
import "./OrgNoProgramParticipantError.css";

type OrgNoProgramParticipantErrorProps = {
  programId: string;
};

/*
 * This component will be visible on OrgProgramMentor (or Student)
 * Participant component, when there is no participants for a program
 */

const OrgNoProgramParticipantError = ({
  programId,
}: OrgNoProgramParticipantErrorProps) => {
  return (
    <Alert variant="danger" className="OrgNoProgramParticipantErrorProps">
      Sorry !! You have no Participants,&nbsp; Send new invitation from{" "}
      <Link to={`${ORGANISATION_PROGRAM_DETAILS}/${programId}/invitations`}>
        Invitation Page
      </Link>
    </Alert>
  );
};

export default OrgNoProgramParticipantError;
