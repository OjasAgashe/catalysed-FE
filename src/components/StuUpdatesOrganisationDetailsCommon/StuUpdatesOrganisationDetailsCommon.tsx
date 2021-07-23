import React from "react";
import { ProgramsApplicantsSummaryHeader } from "../../assets/Illustrations/Illustrations";
import "./StuUpdatesOrganisationDetailsCommon.css";
import "../OrgProgramDetailsCommon/OrgProgramDetailsCommon.css";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  MENTOR_UPDATES_DETAILS_ORGANISATION,
  STUDENT_UPDATES_DETAILS_ORGANISATION,
} from "../../constants/Routes";
import { STUDENT } from "../../constants/Entities";

type StuUpdatesOrganisationDetailsCommonProps = {
  organisationName?: string;
  organisationId: number;
  entity: string;
};

const StuUpdatesOrganisationDetailsCommon = ({
  organisationName = "",
  organisationId,
  entity,
}: StuUpdatesOrganisationDetailsCommonProps) => {
  const location = useLocation();

  return (
    <div
      className="StuUpdatesOrganisationDetailsCommonContainer"
      style={{ backgroundImage: `url(${ProgramsApplicantsSummaryHeader})` }}
    >
      <div className="CommonProgramDetailsHeroText">
        <span>{organisationName}</span>
      </div>

      <div className="PDViewAndRouteLinksContainer">
        <Alert variant="warning" className="ProgramDetailsRouteLinks">
          <div
            className={`${
              location.pathname.includes(
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_ORGANISATION
                  : MENTOR_UPDATES_DETAILS_ORGANISATION
              ) && location.pathname.includes("details")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } ProgramDetailsLinkDiv`}
          >
            <Link
              to={`${
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_ORGANISATION
                  : MENTOR_UPDATES_DETAILS_ORGANISATION
              }/${organisationId}/details`}
              className="ProgramDetailsLink Link"
            >
              {/* Only for Styling Purpose className is used Here */}
              Details
            </Link>
          </div>

          <div
            className={`${
              location.pathname.includes(
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_ORGANISATION
                  : MENTOR_UPDATES_DETAILS_ORGANISATION
              ) && location.pathname.includes("programs")
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <Link
              to={`${
                entity === STUDENT
                  ? STUDENT_UPDATES_DETAILS_ORGANISATION
                  : MENTOR_UPDATES_DETAILS_ORGANISATION
              }/${organisationId}/programs`}
              className="ApplicantsLink Link"
            >
              {/* Only for Styling Purpose className is used Here */}
              Programs
            </Link>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuUpdatesOrganisationDetailsCommon;
