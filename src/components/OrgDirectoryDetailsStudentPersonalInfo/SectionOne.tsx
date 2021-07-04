import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OrgDirectoryDetailsBoy } from "../../assets/Illustrations/Illustrations";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";

type SectionOneProps = {
  state: OrgDirectoryDetailsCommonState;
};

const SectionOne = ({ state }: SectionOneProps) => {
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
            <span className="Data">{`${state.responseData?.firstName} ${state.responseData?.lastName}`}</span>
          </div>

          <div className="DataCardAge">
            <span className="CreateProgramFormText">Age&nbsp;:&nbsp;</span>
            <span className="Data">
              {state.responseData?.birthYear
                ? new Date().getFullYear() -
                  parseInt(state.responseData?.birthYear)
                : ""}
            </span>
          </div>

          <div className="DataCardGender">
            <span className="CreateProgramFormText">Gender&nbsp;:&nbsp;</span>
            <span className="Data">{state.responseData?.gender}</span>
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
                      state.responseData?.phone.countryName ?? ""
                    )}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.35em",
                      boxShadow: "2px 2px 8px var(--blue-gray-300)",
                      padding: "0",
                    }}
                  />
                  &nbsp;&nbsp; +
                  <span className="Data">
                    {state.responseData?.phone.countryCode}
                  </span>
                  &nbsp;
                  <span className="Data">
                    {state.responseData?.phone.number}
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
                      {state.responseData?.email}
                    </Tooltip>
                  }
                >
                  <span className="Data">
                    {state.responseData?.email
                      ? state.responseData?.email.length > 18
                        ? `${state.responseData?.email.substring(0, 18)}...`
                        : state.responseData?.email
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
