import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ORGANISATION_PROGRAM_INVITATIONS } from "../../constants/Routes";
import "./OrgNoProgramParticipantError.css";

type OrgNoProgramParticipantErrorProps = {
  programId: string;
};

const OrgNoProgramParticipantError = ({
  programId,
}: OrgNoProgramParticipantErrorProps) => {
  return (
    <Alert variant="danger" className="OrgNoProgramParticipantErrorProps">
      Sorry !! You have no Participants,&nbsp; Send new invitation from{" "}
      <Link to={`${ORGANISATION_PROGRAM_INVITATIONS}/${programId}`}>
        Invitation Page
      </Link>
    </Alert>
  );
};

export default OrgNoProgramParticipantError;
