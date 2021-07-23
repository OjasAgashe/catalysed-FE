import React from "react";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { OrgProgramDetails } from "../../assets/Illustrations/Illustrations";
import { STUDENT } from "../../constants/Entities";
import {
  MENTOR_UPDATES_DETAILS_PROGRAM,
  STUDENT_UPDATES_DETAILS_PROGRAM,
} from "../../constants/Routes";
import "../OrgProgramDetailsCommon/OrgProgramDetailsCommon.css";

type StuUpdatesProgramDetailsCommonProps = {
  programTitle?: string;
  programId: number;
  entity: string;
};

const StuUpdatesProgramDetailsCommon = ({
  programTitle = "",
  programId,
  entity,
}: StuUpdatesProgramDetailsCommonProps) => {
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
              location.pathname.includes(
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_PROGRAM
                  : MENTOR_UPDATES_DETAILS_PROGRAM
              ) && location.pathname.includes("details")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } ProgramDetailsLinkDiv`}
          >
            <Link
              to={`${
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_PROGRAM
                  : MENTOR_UPDATES_DETAILS_PROGRAM
              }/${programId}/details`}
              className="ProgramDetailsLink Link"
            >
              {/* Only for Styling Purpose className is used Here */}
              Program Details
            </Link>
          </div>

          <div
            className={`${
              location.pathname.includes(
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_PROGRAM
                  : MENTOR_UPDATES_DETAILS_PROGRAM
              ) && location.pathname.includes("dashboard")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } InvitationsLinkDiv`}
          >
            <Link
              to={`${
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_PROGRAM
                  : MENTOR_UPDATES_DETAILS_PROGRAM
              }/${programId}/dashboard`}
              className="InvitationsLink Link"
            >
              {/* Only for Styling Purpose className is used Here */}
              Dashboard
            </Link>
          </div>

          <div
            className={`${
              location.pathname.includes(
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_PROGRAM
                  : MENTOR_UPDATES_DETAILS_PROGRAM
              ) && location.pathname.includes("people")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <Link
              to={`${
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_PROGRAM
                  : MENTOR_UPDATES_DETAILS_PROGRAM
              }/${programId}/people`}
              className="ApplicantsLink Link"
            >
              {/* Only for Styling Purpose className is used Here */}
              People
            </Link>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuUpdatesProgramDetailsCommon;
