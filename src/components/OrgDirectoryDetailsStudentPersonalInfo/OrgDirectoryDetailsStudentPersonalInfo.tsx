import React from "react";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import "../OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo.css";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import { OrgSpecificApplicantDetailsState } from "../../types/OrgSpecificApplicantDetails";

type OrgDirectoryDetailsStudentPersonalInfoProps = {
  state?: OrgDirectoryDetailsCommonState;
    applicantState?: OrgSpecificApplicantDetailsState;

};

const OrgDirectoryDetailsStudentPersonalInfo = ({
  state,
  applicantState
}: OrgDirectoryDetailsStudentPersonalInfoProps) => {
  return (
    <div className="OrgDirectoryDetailsPersonalContainer">
      <SectionOne state={state} applicantState={applicantState} />
      <SectionTwo state={state} applicantState={applicantState} />
      {state && <OrgDirectoryDetailsBackBtn />}
    </div>
  );
};

export default OrgDirectoryDetailsStudentPersonalInfo;
