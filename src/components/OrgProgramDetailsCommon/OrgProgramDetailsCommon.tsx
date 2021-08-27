import React from "react";
import { Alert } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { OrgProgramDetails } from "../../assets/Illustrations/Illustrations";
import { ORGANISATION_PROGRAM_DETAILS } from "../../constants/Routes";
import NestedPageBackBtn from "../NestedPageBackBtn/NestedPageBackBtn";
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
  const history = useHistory();

  /*
   * This function is still to complete
   *
   * As we can reach this page from View and Search page with
   * all or this_month or in_progress as the Parameter in URL
   * . So have to ask, on click of this button where we have to
   * redirect View_and_Search/all or View_and_Search/this_month
   * or to View_and_Search/in_progress
   */
  const handleNestedPageBackBtnClick = () => {
    history.push("#");
  };

  return (
    <div
      className="CommonProgramDetailsDiv"
      style={{ backgroundImage: `url(${OrgProgramDetails})` }}
    >
      <NestedPageBackBtn onClick={handleNestedPageBackBtnClick} />

      <div className="CommonProgramDetailsHeroText">
        <span>{programTitle}</span>
      </div>
      <div className="PDViewAndRouteLinksContainer">
        <Alert variant="warning" className="ProgramDetailsRouteLinks">
          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_DETAILS) &&
              location.pathname.includes("details")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } ProgramDetailsLinkDiv`}
          >
            <Link
              to={`${ORGANISATION_PROGRAM_DETAILS}/${programId}/details`}
              className="ProgramDetailsLink Link"
            >
              Program Details
            </Link>
          </div>

          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_DETAILS) &&
              location.pathname.includes("invitations")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } InvitationsLinkDiv`}
          >
            <Link
              to={`${ORGANISATION_PROGRAM_DETAILS}/${programId}/invitations`}
              className="InvitationsLink Link"
            >
              Invitations
            </Link>
          </div>

          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_DETAILS) &&
              location.pathname.includes("participants")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } ParticipantsLinkDiv`}
          >
            <Link
              to={`${ORGANISATION_PROGRAM_DETAILS}/${programId}/participants`}
              className="ParticipantsLink Link"
            >
              Participants
            </Link>
          </div>
          <div
            className={`${
              location.pathname.includes(ORGANISATION_PROGRAM_DETAILS) &&
              location.pathname.includes("applicants")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <Link
              to={`${ORGANISATION_PROGRAM_DETAILS}/${programId}/applicants`}
              className="ApplicantsLink Link"
            >
              Applicants
            </Link>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default OrgProgramDetailsCommon;
