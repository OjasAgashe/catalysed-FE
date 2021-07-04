import React from "react";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import "../OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo.css";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";

type OrgDirectoryDetailsStudentPersonalInfoProps = {
  state: OrgDirectoryDetailsCommonState;
};

const OrgDirectoryDetailsStudentPersonalInfo = ({
  state,
}: OrgDirectoryDetailsStudentPersonalInfoProps) => {
  return (
    <div className="OrgDirectoryDetailsPersonalContainer">
      <SectionOne state={state} />
      <SectionTwo state={state} />
      <OrgDirectoryDetailsBackBtn />
    </div>
  );
};

export default OrgDirectoryDetailsStudentPersonalInfo;
