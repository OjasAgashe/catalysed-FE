import React from "react";
import { useHistory } from "react-router-dom";
import { MENTOR, STUDENT } from "../../constants/Entities";
import { MENTOR_UPDATES, STUDENT_UPDATES } from "../../constants/Routes";
import SectionHeadingDiv from "../OrgHome/SectionHeadingDiv";
import { StudentHomeState } from "../../types/StudentHome";
import NextBtnDiv from "../OrgHome/NextBtnDiv";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type OrgInfoCardProps = {
  state: StudentHomeState;
};

const OrgInfoCard = ({ state }: OrgInfoCardProps) => {
  const history = useHistory();

  const handleOrgInfoCardBtnClick = () => {
    if (state.entity === STUDENT)
      history.push(`${STUDENT_UPDATES}?view=ORGANISATIONS`);
    else if (state.entity === MENTOR)
      history.push(`${MENTOR_UPDATES}?view=ORGANISATIONS`);
  };

  return (
    <div className="StudentInfoCard OrgInfoCard">
      <SectionHeadingDiv headingText="Organisation" />
      <div className="StatNImgContainer">
        <div className="OrgNameLinkDetailsContainer">
          <div className="OrgNameDiv">
            <span className="CreateProgramFormText">Name&nbsp;:&nbsp;</span>
            <div>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="name-tooltip">CatalysEd</Tooltip>}
              >
                <span className="Data">
                  {"CatalysEd".length > 20
                    ? `${"CatalysEd".substring(0, 20)}...`
                    : "CatalysEd"}
                </span>
              </OverlayTrigger>
            </div>
          </div>
          <div className="OrgSocialLink">
            <span className="CreateProgramFormText">
              Socail Media Link&nbsp;:&nbsp;
            </span>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="social-link-tooltip">
                  https://www.linkedin.com/temp
                </Tooltip>
              }
            >
              <a
                href="https://www.linkedin.com/temp"
                target="_blank"
                rel="noreferrer"
              >
                <span className="Data">
                  {"https://www.linkedin.com/temp".length > 20
                    ? `${"https://www.linkedin.com/temp".substring(0, 20)}...`
                    : "https://www.linkedin.com/temp"}
                </span>
              </a>
            </OverlayTrigger>
          </div>
          <div className="OrgWebsiteLink">
            <span className="CreateProgramFormText">
              Website Link&nbsp;:&nbsp;
            </span>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="website-link-tooltip">
                  https://catalysed.org
                </Tooltip>
              }
            >
              <a href="https://catalysed.org" target="_blank" rel="noreferrer">
                <span className="Data">
                  {"https://catalysed.org".length > 20
                    ? `${"https://catalysed.org".substring(0, 20)}...`
                    : "https://catalysed.org"}
                </span>
              </a>
            </OverlayTrigger>
          </div>
        </div>
        <div>
          <div className="CurrentStatDiv">
            <div className="CurrentStatDivHeading">
              Programs
              <br />
              About to
              <br />
              Start&nbsp;:&nbsp;
            </div>
            <div className="CurrentStatDivValue">0</div>
          </div>
        </div>
      </div>
      <NextBtnDiv onClick={handleOrgInfoCardBtnClick} />
    </div>
  );
};

export default OrgInfoCard;
