import React from "react";
import { StudentUpdatesOrganisationSurvey } from "../../assets/Illustrations/Illustrations";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import { StudentUpdatesOrgDetailsResponse } from "../../types/StudentUpdates";

type SectionTwoProps = {
  orgDetails: StudentUpdatesOrgDetailsResponse["orgDetails"];
};

const SectionTwo = ({ orgDetails }: SectionTwoProps) => {
  return (
    <div className="SectionTwo">
      <div className="SectionTwoFirstHalf">
        <div className="DataCard">
          <div className="DataCardAofW">
            <span className="CreateProgramFormText">
              Area of Work&nbsp;:&nbsp;
            </span>
            <span className="Data">{orgDetails?.workDescription}</span>
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
                    countryCode={getCode(orgDetails?.phone.countryName ?? "")}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.35em",
                      boxShadow: "2px 2px 8px var(--blue-gray-300)",
                      padding: "0",
                    }}
                  />
                  &nbsp;&nbsp;
                  <span className="Data">{orgDetails?.phone.countryCode}</span>
                  &nbsp;
                  <span className="Data">{orgDetails?.phone.number}</span>
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
                      {orgDetails?.contactEmail}
                    </Tooltip>
                  }
                >
                  <span className="Data">{orgDetails?.contactEmail}</span>
                </OverlayTrigger>
              </div>
            </div>
          </div>

          <div className="DataCardLocation">
            <div className="CreateProgramFormText">Location&nbsp;:&nbsp;</div>

            <div className="DataCardLocationRnC">
              <div className="DataCardLocationRegion">
                <span className="CreateProgramFormText">
                  region&nbsp;:&nbsp;
                </span>
                <span className="Data">{orgDetails?.address.region}</span>
                <span className="RegionComma">&nbsp;,</span>
              </div>

              <div className="DataCardLocationCountry">
                <span className="CreateProgramFormText">
                  country&nbsp;:&nbsp;
                </span>
                <span className="Data">{orgDetails?.address.country}</span>
              </div>
            </div>
          </div>

          <div className="DataCardYofI">
            <span className="CreateProgramFormText">
              Year of Inception&nbsp;:&nbsp;
            </span>
            <span className="Data">{orgDetails?.yearOfInception}</span>
          </div>

          <div className="DataCardPrimaryLanguage">
            <span className="CreateProgramFormText">
              Primary Language&nbsp;:&nbsp;
            </span>
            <span className="LanguageLi">{orgDetails?.primaryLanguage}</span>
          </div>
        </div>
      </div>

      <div className="SectionTwoSecondHalf">
        <img
          src={`${StudentUpdatesOrganisationSurvey}`}
          alt="section two survey svg"
        />
      </div>
    </div>
  );
};

export default SectionTwo;
