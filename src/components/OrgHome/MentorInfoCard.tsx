import React from "react";
import { OrgHomeMentorInfoCard } from "../../assets/Illustrations/Illustrations";
import CurrentStatDiv from "./CurrentStatDiv";
import SectionHeadingDiv from "./SectionHeadingDiv";
import NextBtnDiv from "./NextBtnDiv";

const MentorInfoCard = () => {
  const handleMentorInfoNextBtnClick = () => {
    console.log("Mentor Info Next Btn Click");
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
