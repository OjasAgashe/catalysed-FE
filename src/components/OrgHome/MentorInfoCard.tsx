import React from "react";
import { OrgHomeMentorInfoCard } from "../../assets/Illustrations/Illustrations";
import CurrentStatDiv from "./CurrentStatDiv";
import SectionHeadingDiv from "./SectionHeadingDiv";
import NextBtnDiv from "./NextBtnDiv";
import { ORGANISATION_DIRECTORY } from "../../constants/Routes";
import { useHistory } from "react-router-dom";

const MentorInfoCard = () => {
  const history = useHistory();

  const handleMentorInfoNextBtnClick = () => {
    history.push(`${ORGANISATION_DIRECTORY}?type=MENTOR`);
  };

  return (
    <div className="MentorInfoCard">
      <SectionHeadingDiv headingText="Mentor" />
      <div className="StatNImgContainer">
        <div className="StatDivContainer">
          <div className="TotalStatDiv">
            <CurrentStatDiv divHeadingText="Total" divHeadingValue="0" />
          </div>
          <div className="NewThisMonthDiv">
            <CurrentStatDiv
              divHeadingText="New This Month"
              divHeadingValue="0"
            />
          </div>
        </div>
        <div className="MentorInfoCardImgContainer">
          <img
            src={OrgHomeMentorInfoCard}
            alt="mentor info card illustration"
            className="OrgHomeMentorInfoCardImg"
          />
        </div>
      </div>
      <NextBtnDiv onClick={handleMentorInfoNextBtnClick} />
    </div>
  );
};

export default MentorInfoCard;
