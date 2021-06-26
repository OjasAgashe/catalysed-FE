import React from "react";
import { Alert } from "react-bootstrap";
import { OrgDirectoryDetailsHeader } from "../../assets/Illustrations/Illustrations";

import "./OrgDirectoryDetailsCommonHeader.css";

type OrgDirectoryDetailsCommonHeaderProps = {
  full_name: string;
  choosedOption: string;
  setChoosedOption: React.Dispatch<React.SetStateAction<string>>;
};

const OrgDirectoryDetailsCommonHeader = ({
  full_name,
  choosedOption,
  setChoosedOption,
}: OrgDirectoryDetailsCommonHeaderProps) => {
  return (
    <div
      className="OrgDirectoryDetailsCommonHeaderContainer"
      style={{ backgroundImage: `url(${OrgDirectoryDetailsHeader})` }}
    >
      <div className="OrgDirectoryDetailsCommonHeaderHeroText">
        <span>{full_name}&nbsp;:&nbsp;Details</span>
      </div>

      <div className="OrgDirectoryDetailsPIOrCtPOptContainer">
        <Alert variant="warning" className="OrgDirectoryDetailsPIOrCtPOpt">
          <div
            className={`${
              choosedOption === "PersonalInfo" ? "BlankDiv" : "NoBlankDiv"
            }`}
          >
            &nbsp;
          </div>
          <div
            className={`${
              choosedOption === "PersonalInfo"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <button
              className="PersonalInfoBtnOpt"
              type="button"
              onClick={() => {
                setChoosedOption("PersonalInfo");
              }}
            >
              Personal Info
            </button>
          </div>
          <div
            className={`${
              choosedOption === "PersonalInfo"
                ? "NotCurrentSelectedTab"
                : "CurrentSelectedTab"
            }`}
          >
            <button
              className="CtPBtnOpt"
              type="button"
              onClick={() => {
                setChoosedOption("ConnectedToPrograms");
              }}
            >
              Connected to Programs
            </button>
          </div>
          <div
            className={`${
              choosedOption !== "PersonalInfo" ? "BlankDiv" : "NoBlankDiv"
            }`}
          >
            &nbsp;
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default OrgDirectoryDetailsCommonHeader;