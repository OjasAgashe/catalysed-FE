import React from "react";
import { Alert } from "react-bootstrap";
import { OrgDirectoryDetailsHeader } from "../../assets/Illustrations/Illustrations";
import {
  OrgDirectoryDetailsCommonActionType,
  OrgDirectoryDetailsCommonState,
} from "../../types/OrganisationDirectory";

import "./OrgDirectoryDetailsCommonHeader.css";

/*
 * This component has been used for showing header in
 * OrgDirectoryMentorDetailsPage and OrgDirectoryStudentDetailsPage
 */

type OrgDirectoryDetailsCommonHeaderProps = {
  state: OrgDirectoryDetailsCommonState;
  dispatch: React.Dispatch<OrgDirectoryDetailsCommonActionType>;
};

/*
 * OrgDirectoryDetailsCommonHeader : component accepts state and dispatch
 * as the props
 */

const OrgDirectoryDetailsCommonHeader = ({
  state,
  dispatch,
}: OrgDirectoryDetailsCommonHeaderProps) => {
  return (
    <div
      className="OrgDirectoryDetailsCommonHeaderContainer"
      style={{ backgroundImage: `url(${OrgDirectoryDetailsHeader})` }}
    >
      <div className="OrgDirectoryDetailsCommonHeaderHeroText">
        <span>
          {/* Show Name */}
          {`${state.responseData?.firstName} ${state.responseData?.lastName}`}
          &nbsp;:&nbsp;Details
        </span>
      </div>

      <div className="OrgDirectoryDetailsPIOrCtPOptContainer">
        <Alert variant="warning" className="OrgDirectoryDetailsPIOrCtPOpt">
          <div
            className={`${
              /*
               * if value of state.choosedOption is equal to "PersonalInfo" then
               * changed the design of this div to CurrentSelectedTab else to
               * NotCurrentSelectedTab
               */
              state.choosedOption === "PersonalInfo"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } OrgDirectoryDetailsPIOpt`}
          >
            <button
              className="PersonalInfoBtnOpt"
              type="button"
              onClick={() => {
                /*
                 * If Personal Info tab selected then store "PersonalInfo" value in
                 * state.choosedOption, to change the tab design and show information
                 * of personal details
                 */
                dispatch({ type: "choosedOption", payload: "PersonalInfo" });
              }}
            >
              Personal Info
            </button>
          </div>
          <div
            className={`${
              /*
               * If value of state.choosedOption is equal to "PersonalInfo" then
               * change the design of this div to NotCurrentSelectedTab else to
               * CurrentSelectedTab
               */
              state.choosedOption === "PersonalInfo"
                ? "NotCurrentSelectedTab"
                : "CurrentSelectedTab"
            }`}
          >
            <button
              className="CtPBtnOpt"
              type="button"
              onClick={() => {
                /*
                 * If Connected to Programs tab selected then store "ConnectedToPrograms"
                 * value in state.choosedOption, so the design of tab change accordingly
                 */
                dispatch({
                  type: "choosedOption",
                  payload: "ConnectedToPrograms",
                });
              }}
            >
              Connected to Programs
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default OrgDirectoryDetailsCommonHeader;
