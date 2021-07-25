import React from "react";
import "./StuSuggestedProgramDetailsCommon.css";
import "../OrgProgramDetailsCommon/OrgProgramDetailsCommon.css";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { OrgEditProgramHeader } from "../../assets/Illustrations/Illustrations";
import { STUDENT_SUGGESTED_PROGRAMS } from "../../constants/Routes";

type StuSuggestedProgramDetailsCommonProps = {
  programTitle: string;
  programId: number;
};

const StuSuggestedProgramDetailsCommon = ({
  programTitle,
  programId,
}: StuSuggestedProgramDetailsCommonProps) => {
  const location = useLocation();

  return (
    <div
      className="StuSuggestedProgramDetailsCommonContainer"
      style={{ backgroundImage: `url(${OrgEditProgramHeader})` }}
    >
      <div className="CommonProgramDetailsHeroText">
        <span>programTitle</span>
      </div>

      <div className="PDViewAndRouteLinksContainer">
        <Alert variant="warning" className="ProgramDetailsRouteLinks">
          <div
            className={`${
              location.pathname.includes(STUDENT_SUGGESTED_PROGRAMS) &&
              location.pathname.includes("details")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } ProgramDetailsLinkDiv`}
          >
            <Link
              to={`${STUDENT_SUGGESTED_PROGRAMS}/${programId}/details`}
              className="ProgramDetailsLink Link"
            >
              {/* Only for Styling Purpose className is used Here */}
              Program Details
            </Link>
          </div>

          <div
            className={`${
              location.pathname.includes(STUDENT_SUGGESTED_PROGRAMS) &&
              location.pathname.includes("application")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <Link
              to={`${STUDENT_SUGGESTED_PROGRAMS}/${programId}/application`}
              className="ApplicantsLink Link"
            >
              {/* Only for Styling Purpose className is used Here */}
              Application
            </Link>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuSuggestedProgramDetailsCommon;
