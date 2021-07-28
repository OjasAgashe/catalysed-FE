import React from "react";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import { OrgSpecificApplicantDetailsState } from "../../types/OrgSpecificApplicantDetails";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";
import "./OrgDirectoryDetailsPersonalInfo.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

/*
 * This component has been used in OrgDirectoryMentorDetailsPage, and
 * OrgSpecificMentorApplicantDetailsPage
 */

type OrgDirectoryDetailsPersonalInfoProps = {
  state?: OrgDirectoryDetailsCommonState;
  applicantState?: OrgSpecificApplicantDetailsState;
};

/*
 * OrgDirectoryDetailsPersonalInfo : component accepts two props,
 * 1) state : of OrgDirectoryMentorDetailsPage
 * 2) applicantState : of OrgSpecificMentorApplicantDetailsPage
 *
 * And both are optional, as we will send only one at a time
 * (state from Directory Page and applicantState from Specific Details Page)
 */
const OrgDirectoryDetailsPersonalInfo = ({
  state,
  applicantState,
}: OrgDirectoryDetailsPersonalInfoProps) => {
  return (
    <div className="OrgDirectoryDetailsPersonalContainer">
      <SectionOne state={state} applicantState={applicantState} />
      <SectionTwo state={state} applicantState={applicantState} />

      {/*
       * Show "Go Back to Directory" button, only when we have value in state,
       * means applicantState does not contain anything
       */}
      {state && <OrgDirectoryDetailsBackBtn />}
    </div>
  );
};

export default OrgDirectoryDetailsPersonalInfo;
