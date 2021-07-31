import React from "react";
import { Alert } from "react-bootstrap";
import { OrgProfileCommonHeaderImg } from "../../assets/Illustrations/Illustrations";
import {
  StudentUpdatesApplicationDetailsActionType,
  StudentUpdatesApplicationDetailsState,
} from "../../types/StudentUpdates";
import "../OrgSpecificApplicantDetailsHeader/OrgSpecificApplicantDetailsHeader.css";

type StuUpdatesApplicationDetailsHeaderProps = {
  state: StudentUpdatesApplicationDetailsState;
  dispatch: React.Dispatch<StudentUpdatesApplicationDetailsActionType>;
};

const StuUpdatesApplicationDetailsHeader = ({
  state,
  dispatch,
}: StuUpdatesApplicationDetailsHeaderProps) => {
  return (
    <div
      className="OrgSpecificApplicantDetailsHeaderContainer"
      style={{ backgroundImage: `url(${OrgProfileCommonHeaderImg})` }}
    >
      <div className="OrgSpecificApplicantDetailsHeaderHeroText">
        <span>{state.responseData?.programDetails?.title}</span>
      </div>

      <div className="OrgSpecificApplicantDetailsOptionContainer">
        <Alert variant="warning" className="OrgSpecificApplicantDetailsOption">
          <div
            className={`${
              state.choosedOption === "Application"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } OrgSpecificApplicantApplicationOpt`}
          >
            <button
              className="ApplicationBtnOpt"
              type="button"
              onClick={() => {
                dispatch({ type: "choosedOption", payload: "Application" });
              }}
            >
              Application
            </button>
          </div>
          <div
            className={`${
              state.choosedOption === "Program Details"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <button
              className="CtPBtnOpt"
              type="button"
              onClick={() => {
                dispatch({ type: "choosedOption", payload: "Program Details" });
              }}
            >
              Program Details
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuUpdatesApplicationDetailsHeader;
