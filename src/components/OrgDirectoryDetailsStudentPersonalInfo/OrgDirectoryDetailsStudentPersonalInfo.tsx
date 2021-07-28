import React from "react";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import "../OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo.css";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import { OrgSpecificApplicantDetailsState } from "../../types/OrgSpecificApplicantDetails";

/*
 * This component has been used in OrgDirectoryStudentDetailsPage, and
 * OrgSpecificStudentApplicantDetailsPage
 */

type OrgDirectoryDetailsStudentPersonalInfoProps = {
  state?: OrgDirectoryDetailsCommonState;
  applicantState?: OrgSpecificApplicantDetailsState;
};

/*
 * OrgDirectoryDetailsStudentPersonalInfo : component accepts two props,
 * 1) state : of OrgDirectoryStudentDetailsPage
 * 2) applicantState : of OrgSpecificStudentApplicantDetailsPage
 *
 * And both are optional, as we will send only one at a time
 * (state from Directory Page and applicantState from Specific Details Page)
 */
const OrgDirectoryDetailsStudentPersonalInfo = ({
  state,
  applicantState,
}: OrgDirectoryDetailsStudentPersonalInfoProps) => {
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

export default OrgDirectoryDetailsStudentPersonalInfo;
