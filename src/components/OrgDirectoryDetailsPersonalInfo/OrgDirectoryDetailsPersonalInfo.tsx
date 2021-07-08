import React from "react";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import { OrgSpecificApplicantDetailsState } from "../../types/OrgSpecificApplicantDetails";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";
import "./OrgDirectoryDetailsPersonalInfo.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

type OrgDirectoryDetailsPersonalInfoProps = {
  state?: OrgDirectoryDetailsCommonState;
  applicantState?: OrgSpecificApplicantDetailsState;
};

const OrgDirectoryDetailsPersonalInfo = ({
  state,
  applicantState,
}: OrgDirectoryDetailsPersonalInfoProps) => {
  return (
    <div className="OrgDirectoryDetailsPersonalContainer">
      <SectionOne state={state} applicantState={applicantState} />
      <SectionTwo state={state} applicantState={applicantState} />
      {state && <OrgDirectoryDetailsBackBtn />}
    </div>
  );
};

export default OrgDirectoryDetailsPersonalInfo;
