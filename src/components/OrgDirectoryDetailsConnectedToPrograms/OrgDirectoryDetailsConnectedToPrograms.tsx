import React from "react";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import OrgDirectoryDetailsBackBtn from "../OrgDirectoryDetailsBackBtn/OrgDirectoryDetailsBackBtn";

import "./OrgDirectoryDetailsConnectedToPrograms.css";
import Section from "./Section";
import Error from "../Error/Error";

type OrgDirectoryDetailsConnectedToProgramsProps = {
  state: OrgDirectoryDetailsCommonState;
};

const OrgDirectoryDetailsConnectedToPrograms = ({
  state,
}: OrgDirectoryDetailsConnectedToProgramsProps) => {
  return (
    <div className="OrgDirectoryDetailsConnectedProgramsContainer">
      <div className="OrgProgramInvitationDetails">
        <div className="OrgProgramInvitationDetailsContainer">
          <div className="FormDetailsText">Connected to Programs</div>

          {state.responseData?.connectPrograms &&
          state.responseData?.connectPrograms.length ? (
            <Section state={state} />
          ) : (
            <div className="ErrorContainer">
              <Error message="Sorry !! Not Connected To Programs Yet" />
            </div>
          )}
        </div>
      </div>

      <OrgDirectoryDetailsBackBtn />
    </div>
  );
};

export default OrgDirectoryDetailsConnectedToPrograms;
