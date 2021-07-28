import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OrgDirectoryDetailsBoy } from "../../assets/Illustrations/Illustrations";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import { OrgSpecificApplicantDetailsState } from "../../types/OrgSpecificApplicantDetails";

type SectionOneProps = {
  state?: OrgDirectoryDetailsCommonState;
  applicantState?: OrgSpecificApplicantDetailsState;
};

/*
 * SectionOne : component accepts state and applicantState as props
 *
 * In this we will show data according to state, when we will have value in
 * state (means applicantState does not contain anything), and we will show 
 * data according to applicantState when we will have
 * value in applicantState (means state does not contain anything)
 */
const SectionOne = ({ state, applicantState }: SectionOneProps) => {
  return (
    <div className="SectionOne">
      <div className="SectionOneFirstHalf">
        <img src={`${OrgDirectoryDetailsBoy}`} alt="section one boy svg" />
      </div>

      <div className="SectionOneSecondHalf">
        <div className="DataCard">
          <div className="FormDetailsText">Personal Info</div>

          <div className="DataCardFullName">
            <span className="CreateProgramFormText">
              Full Name&nbsp;:&nbsp;
            </span>
            <span className="Data">{`${
              state
                ? state?.responseData?.firstName
                : applicantState?.responseData?.mentorDetails?.firstName
            } ${
              state
                ? state?.responseData?.lastName
                : applicantState?.responseData?.mentorDetails?.lastName
            }`}</span>
          </div>

          <div className="DataCardAge">
            <span className="CreateProgramFormText">Age&nbsp;:&nbsp;</span>
            <span className="Data">
              {state
                ? state?.responseData?.birthYear
                  ? new Date().getFullYear() -
                    parseInt(state?.responseData?.birthYear)
                  : ""
                : applicantState?.responseData?.mentorDetails?.birthYear
                ? new Date().getFullYear() -
                  parseInt(
                    applicantState?.responseData?.mentorDetails?.birthYear
                  )
                : ""}
            </span>
          </div>

          <div className="DataCardGender">
            <span className="CreateProgramFormText">Gender&nbsp;:&nbsp;</span>
            <span className="Data">
              {state
                ? state?.responseData?.gender === "MALE"
                  ? "Male"
                  : state?.responseData?.gender === "FEMALE"
                  ? "Female"
                  : state?.responseData?.gender
                : applicantState?.responseData?.mentorDetails?.gender === "MALE"
                ? "Male"
                : applicantState?.responseData?.mentorDetails?.gender ===
                  "FEMALE"
                ? "Female"
                : applicantState?.responseData?.mentorDetails?.gender}
            </span>
          </div>

          <div className="DataCardContact">
            <div className="CreateProgramFormText">Contact&nbsp;:&nbsp;</div>

            <div className="DataCardContactPnE">
              <div className="DataCardContactPhone">
                <span className="CreateProgramFormText">
                  phone&nbsp;:&nbsp;
                </span>
                <span>
                  <ReactCountryFlag
                    countryCode={getCode(
                      state
                        ? state?.responseData?.phone.countryName ?? ""
                        : applicantState?.responseData?.mentorDetails?.phone
                            .countryName ?? ""
                    )}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.35em",
                      boxShadow: "2px 2px 8px var(--blue-gray-300)",
                      padding: "0",
                    }}
                  />
                  &nbsp;&nbsp;
                  <span className="Data">
                    {state
                      ? state?.responseData?.phone.countryCode
                      : applicantState?.responseData?.mentorDetails?.phone
                          .countryCode}
                  </span>
                  &nbsp;
                  <span className="Data">
                    {state
                      ? state?.responseData?.phone.number
                      : applicantState?.responseData?.mentorDetails?.phone
                          .number}
                  </span>
                </span>
                <span className="PhoneComma">&nbsp;,</span>
              </div>

              <div className="DataCardContactEmail">
                <span className="CreateProgramFormText">
                  email&nbsp;:&nbsp;
                </span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="datacard-email-tooltip">
                      {state
                        ? state?.responseData?.email
                        : applicantState?.responseData?.mentorDetails?.email}
                    </Tooltip>
                  }
                >
                  <span className="Data">
                    {state
                      ? state?.responseData?.email
                        ? state?.responseData?.email.length > 18
                          ? `${state?.responseData?.email.substring(0, 18)}...`
                          : state?.responseData?.email
                        : ""
                      : applicantState?.responseData?.mentorDetails?.email
                      ? applicantState?.responseData?.mentorDetails?.email
                          .length > 18
                        ? `${applicantState?.responseData?.mentorDetails?.email.substring(
                            0,
                            18
                          )}...`
                        : applicantState?.responseData?.mentorDetails?.email
                      : ""}
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
