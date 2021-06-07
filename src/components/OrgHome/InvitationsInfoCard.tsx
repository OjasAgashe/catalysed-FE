import React from "react";
import { OrgHomeInvitationsInfoCard } from "../../assets/Illustrations/Illustrations";
import CurrentStatDiv from "./CurrentStatDiv";
import SectionHeadingDiv from "./SectionHeadingDiv";
import NextBtnDiv from "./NextBtnDiv";

const InvitationsInfoCard = () => {
  const handleInvitationsInfoNextBtnClick = () => {
    console.log("Invitations Info Next Btn Click");
  };

  return (
    <div className="InvitationsInfoCard">
      <SectionHeadingDiv headingText="Invitations" />
      <div className="StatNImgContainer">
        <div className="TotalStatDiv">
          <CurrentStatDiv divHeadingText="Total" divHeadingValue="0" />
        </div>
        <div className="InvitationsInfoCardImgContainer">
          <img
            src={OrgHomeInvitationsInfoCard}
            alt="mentor info card illustration"
            className="OrgHomeInvitationsInfoCardImg"
          />
        </div>
      </div>
      <div className="AcceptedNPendingContainer">
        <CurrentStatDiv divHeadingText="Accepted" divHeadingValue="0" />
        <CurrentStatDiv divHeadingText="Pending" divHeadingValue="0" />
      </div>
      <NextBtnDiv onClick={handleInvitationsInfoNextBtnClick} />
    </div>
  );
};

export default InvitationsInfoCard;
