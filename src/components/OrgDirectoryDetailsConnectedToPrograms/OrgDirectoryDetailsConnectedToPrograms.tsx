import React from "react";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";

import "./OrgDirectoryDetailsConnectedToPrograms.css";
import Section from "./Section";
import Error from "../Error/Error";
import { OrgSpecificApplicantDetailsState } from "../../types/OrgSpecificApplicantDetails";

type OrgDirectoryDetailsConnectedToProgramsProps = {
  state?: OrgDirectoryDetailsCommonState | null;
  applicantState?: OrgSpecificApplicantDetailsState | null;
};

const OrgDirectoryDetailsConnectedToPrograms = ({
  state,
  applicantState,
}: OrgDirectoryDetailsConnectedToProgramsProps) => {
  return (
    <div className="OrgDirectoryDetailsConnectedProgramsContainer">
      <div className="OrgProgramInvitationDetails">
        <div className="OrgProgramInvitationDetailsContainer">
          <div className="FormDetailsText">Connected to Programs</div>

          {state?.responseData ? (
            state?.responseData?.connectPrograms.length ? (
              <Section state={state} />
            ) : (
              <div className="ErrorContainer">
                <Error message="Sorry !! Not Connected To Programs Yet" />
              </div>
            )
          ) : (
            ""
          )}

          {applicantState?.responseData?.applicationDetails.applicantType ===
          "MENTOR" ? (
            applicantState?.responseData?.mentorDetails?.connectPrograms
              .length ? (
              <Section applicantState={applicantState} />
            ) : (
              <div className="ErrorContainer">
                <Error message="Sorry !! Not Connected To Programs Yet" />
              </div>
            )
          ) : applicantState?.responseData?.applicationDetails.applicantType ===
            "STUDENT" ? (
            applicantState?.responseData?.studentDetails?.connectPrograms
              .length ? (
              <Section applicantState={applicantState} />
            ) : (
              <div className="ErrorContainer">
                <Error message="Sorry !! Not Connected To Programs Yet" />
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>

      {state && <OrgDirectoryDetailsBackBtn />}
    </div>
  );
};

export default OrgDirectoryDetailsConnectedToPrograms;
