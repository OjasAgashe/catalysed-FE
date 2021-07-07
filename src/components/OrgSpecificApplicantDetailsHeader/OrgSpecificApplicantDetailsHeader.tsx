import React from "react";
import { Alert } from "react-bootstrap";
import { OrgProfileCommonHeaderImg } from "../../assets/Illustrations/Illustrations";
import {
  OrgSpecificApplicantDetailsActionType,
  OrgSpecificApplicantDetailsState,
} from "../../types/OrgSpecificApplicantDetails";
import "./OrgSpecificApplicantDetailsHeader.css";

type OrgSpecificApplicantDetailsHeaderProps = {
  state: OrgSpecificApplicantDetailsState;
  dispatch: React.Dispatch<OrgSpecificApplicantDetailsActionType>;
};

const OrgSpecificApplicantDetailsHeader = ({
  state,
  dispatch,
}: OrgSpecificApplicantDetailsHeaderProps) => {
  return (
    <div
      className="OrgSpecificApplicantDetailsHeaderContainer"
      style={{ backgroundImage: `url(${OrgProfileCommonHeaderImg})` }}
    >
      <div className="OrgSpecificApplicantDetailsHeaderHeroText">
        <span>
          {state.responseData?.applicationDetails?.applicantType === "MENTOR"
            ? `${state.responseData?.mentorDetails?.firstName} ${state.responseData?.mentorDetails?.lastName}`
            : `${state.responseData?.studentDetails?.firstName} ${state.responseData?.studentDetails?.lastName}`}
          &nbsp;&nbsp;Details
        </span>
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
              state.choosedOption === "PersonalInfo"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } OrgSpecificApplicantPIOpt`}
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
              state.choosedOption === "ConnectedToPrograms"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
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

export default OrgSpecificApplicantDetailsHeader;
