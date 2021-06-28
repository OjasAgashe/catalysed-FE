import React from "react";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { OrgProgramDetails } from "../../assets/Illustrations/Illustrations";
import {
  ORGANISATION_PROGRAM_APPLICANTS,
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
  const location = useLocation();

  return (
    <div
      className="CommonProgramDetailsDiv"
      style={{ backgroundImage: `url(${OrgProgramDetails})` }}
    >
      <div className="CommonProgramDetailsHeroText">
        <span>{programTitle}</span>
      </div>

      <div className="PDViewAndRouteLinksContainer">
        <Alert variant="warning" className="ProgramDetailsRouteLinks">
          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_DETAILS)
                ? "BlankDiv"
                : "NoBlankDiv"
            }`}
          >
            &nbsp;
          </div>

          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_DETAILS)
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <Link
              to={`${ORGANISATION_PROGRAM_DETAILS}/${programId}`}
              className="ProgramDetailsLink Link"
            >
              Program Details
            </Link>
          </div>

          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_INVITATIONS)
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <Link
              to={`${ORGANISATION_PROGRAM_INVITATIONS}/${programId}`}
              className="InvitationsLink Link"
            >
              Invitations
            </Link>
          </div>

          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_PARTICIPANTS)
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <Link
              to={`${ORGANISATION_PROGRAM_PARTICIPANTS}/${programId}`}
              className="ParticipantsLink Link"
            >
              Participants
            </Link>
          </div>
          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_APPLICANTS)
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <Link
              to={`${ORGANISATION_PROGRAM_APPLICANTS}/${programId}`}
              className="ApplicantsLink Link"
            >
              Applicants
            </Link>
          </div>
          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_APPLICANTS)
                ? "BlankDiv"
                : "NoBlankDiv"
            }`}
          >
            &nbsp;
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default OrgProgramDetailsCommon;
