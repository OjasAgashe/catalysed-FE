import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { OrgProgramDetails } from "../../assets/Illustrations/Illustrations";
import {
  ORGANISATION_PROGRAM_DETAILS,
  ORGANISATION_PROGRAM_INVITATIONS,
  ORGANISATION_PROGRAM_PARTICIPANTS,
} from "../../constants/Routes";
import "./OrgProgramDetailsCommon.css";

type OrgProgramDetailsCommonProps = {
  programTitle?: string;
  programId: number;
};

const OrgProgramDetailsCommon = ({
  programTitle = "",
  programId,
}: OrgProgramDetailsCommonProps) => {
  return (
    <div
      className="CommonProgramDetailsDiv"
      style={{ backgroundImage: `url(${OrgProgramDetails})` }}
    >
      <div className="CommonProgramDetailsHeroText">
        {/* <div className="ProgramDetailsText">Program Details,</div>
        <div className="InvitationText">Invitations</div>
        <div className="ParticipantText">&amp; Participants</div> */}
        <div>{programTitle}</div>
      </div>

      <div className="PDViewAndRouteLinksContainer">
        {/* <div className="Text">View</div> */}
        <Alert variant="warning" className="ProgramDetailsRouteLinks">
          <Link
            to={`${ORGANISATION_PROGRAM_DETAILS}/${programId}`}
            className="ProgramDetailsLink Link"
          >
            Program Details
          </Link>
          <Link
            to={`${ORGANISATION_PROGRAM_INVITATIONS}/${programId}`}
            className="InvitationsLink Link"
          >
            Invitations
          </Link>
          <Link
            to={`${ORGANISATION_PROGRAM_PARTICIPANTS}/${programId}`}
            className="ParticipantsLink Link"
          >
            Participants
          </Link>
        </Alert>
      </div>
    </div>
  );
};

export default OrgProgramDetailsCommon;
