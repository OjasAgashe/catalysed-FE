import React from "react";
import { StudentUpdatesOrganisationProfileData } from "../../assets/Illustrations/Illustrations";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const SectionOne = () => {
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
            <span className="Data">CatalysEd</span>
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
                    We aim to help every child colour the world by facilitating
                    easy and streamlined access to quality guidance and
                    education by providing them with a platform that helps them
                    unveil their potential and introduce them to phenomenal and
                    unforeseen opportunities.
                  </Tooltip>
                }
              >
                <span className="Data">
                  {`We aim to help every child colour the world by facilitating easy
                and streamlined access to quality guidance and education by
                providing them with a platform that helps them unveil their
                potential and introduce them to phenomenal and unforeseen
                opportunities.`.length > 150
                    ? `${`We aim to help every child colour the world by facilitating easy
                and streamlined access to quality guidance and education by
                providing them with a platform that helps them unveil their
                potential and introduce them to phenomenal and unforeseen
                opportunities.`.substring(0, 150)}...`
                    : `We aim to help every child colour the world by facilitating easy
                and streamlined access to quality guidance and education by
                providing them with a platform that helps them unveil their
                potential and introduce them to phenomenal and unforeseen
                opportunities.`}
                </span>
              </OverlayTrigger>
            </div>
          </div>

          <div className="DataCardSocialLink">
            <span className="CreateProgramFormText">
              Social Link&nbsp;:&nbsp;
            </span>
            <a
              href="https://www.catalysed.org/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="Data">https://www.catalysed.org/</span>
            </a>
          </div>

          <div className="DataCardWebsiteLink">
            <span className="CreateProgramFormText">
              Website Link&nbsp;:&nbsp;
            </span>
            <a
              href="https://www.catalysed.org/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="Data">https://www.catalysed.org/</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
