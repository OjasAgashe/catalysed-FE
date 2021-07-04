import React from "react";
import { Alert } from "react-bootstrap";
import { OrgDirectoryDetailsHeader } from "../../assets/Illustrations/Illustrations";
import {
  OrgDirectoryDetailsCommonActionType,
  OrgDirectoryDetailsCommonState,
} from "../../types/OrganisationDirectory";

import "./OrgDirectoryDetailsCommonHeader.css";

type OrgDirectoryDetailsCommonHeaderProps = {
  state: OrgDirectoryDetailsCommonState;
  dispatch: React.Dispatch<OrgDirectoryDetailsCommonActionType>;
};

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
          {`${state.responseData?.firstName} ${state.responseData?.lastName}`}
          &nbsp;:&nbsp;Details
        </span>
      </div>

      <div className="OrgDirectoryDetailsPIOrCtPOptContainer">
        <Alert variant="warning" className="OrgDirectoryDetailsPIOrCtPOpt">
          <div
            className={`${
              state.choosedOption === "PersonalInfo"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } OrgDirectoryDetailsPIOpt`}
          >
            <button
              className="PersonalInfoBtnOpt"
              type="button"
              onClick={() => {
                dispatch({ type: "choosedOption", payload: "PersonalInfo" });
              }}
            >
              Personal Info
            </button>
          </div>
          <div
            className={`${
              state.choosedOption === "PersonalInfo"
                ? "NotCurrentSelectedTab"
                : "CurrentSelectedTab"
            }`}
          >
            <button
              className="CtPBtnOpt"
              type="button"
              onClick={() => {
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
