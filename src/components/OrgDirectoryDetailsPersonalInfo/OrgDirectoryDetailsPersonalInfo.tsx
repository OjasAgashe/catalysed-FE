import React from "react";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";
import "./OrgDirectoryDetailsPersonalInfo.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

type OrgDirectoryDetailsPersonalInfoProps = {
  state: OrgDirectoryDetailsCommonState;
};

const OrgDirectoryDetailsPersonalInfo = ({
  state,
}: OrgDirectoryDetailsPersonalInfoProps) => {
  return (
    <div className="OrgDirectoryDetailsPersonalContainer">
      <SectionOne state={state} />
      <SectionTwo state={state} />
      <OrgDirectoryDetailsBackBtn />
    </div>
  );
};

export default OrgDirectoryDetailsPersonalInfo;
