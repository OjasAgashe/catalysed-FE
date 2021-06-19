import React from "react";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";

import "../OrgProgramInvitationDetails/OrgProgramInvitationDetails.css";
import "./OrgDirectoryDetailsConnectedToPrograms.css";
import Section from "./Section";

type OrgDirectoryDetailsConnectedToProgramsProps = {
  fakePrograms: {
    name: string;
    state: string;
  }[];
};

const OrgDirectoryDetailsConnectedToPrograms = ({
  fakePrograms,
}: OrgDirectoryDetailsConnectedToProgramsProps) => {

  return (
    <div className="OrgDirectoryDetailsConnectedProgramsContainer">
      <div className="OrgProgramInvitationDetails">
        <div className="OrgProgramInvitationDetailsContainer">
          <div className="FormDetailsText">Connected to Programs</div>
          <Section fakePrograms={fakePrograms} />
        </div>
      </div>

      <OrgDirectoryDetailsBackBtn />
    </div>
  );
};

export default OrgDirectoryDetailsConnectedToPrograms;
