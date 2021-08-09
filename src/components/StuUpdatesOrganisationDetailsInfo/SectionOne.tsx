import React from "react";
import { StudentUpdatesOrganisationProfileData } from "../../assets/Illustrations/Illustrations";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { StudentUpdatesOrgDetailsResponse } from "../../types/StudentUpdates";

type SectionOneProps = {
  orgDetails: StudentUpdatesOrgDetailsResponse["orgDetails"];
};

const SectionOne = ({ orgDetails }: SectionOneProps) => {
  return (
    <div className="SectionOne">
      <div className="SectionOneFirstHalf">
        <img
          src={`${StudentUpdatesOrganisationProfileData}`}
          alt="section one profile data svg"
        />
      </div>

      <div className="SectionOneSecondHalf">
        <div className="DataCard">
          <div className="DataCardName">
            <span className="CreateProgramFormText">Name&nbsp;:&nbsp;</span>
            <span className="Data">{orgDetails?.name}</span>
          </div>

          <div className="DataCardDescription">
            <span className="CreateProgramFormText">
              Description&nbsp;:&nbsp;
            </span>
            <div>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="datacard-description-tooltip">
                    {orgDetails?.description}
                  </Tooltip>
                }
              >
                <span className="Data">
                  {(orgDetails?.description ?? "").length > 150
                    ? `${(orgDetails?.description ?? "").substring(0, 150)}...`
                    : orgDetails?.description}
                </span>
              </OverlayTrigger>
            </div>
          </div>

          <div className="DataCardSocialLink">
            <span className="CreateProgramFormText">
              Social Link&nbsp;:&nbsp;
            </span>
            <a
              href={orgDetails?.socialMediaLink}
              target="_blank"
              rel="noreferrer"
            >
              <span className="Data">{orgDetails?.socialMediaLink}</span>
            </a>
          </div>

          <div className="DataCardWebsiteLink">
            <span className="CreateProgramFormText">
              Website Link&nbsp;:&nbsp;
            </span>
            <a href={orgDetails?.website} target="_blank" rel="noreferrer">
              <span className="Data">{orgDetails?.website}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
