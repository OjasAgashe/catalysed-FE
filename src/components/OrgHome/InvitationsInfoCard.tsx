import React from "react";
import { OrgHomeInvitationsInfoCard } from "../../assets/Illustrations/Illustrations";
import CurrentStatDiv from "./CurrentStatDiv";
import SectionHeadingDiv from "./SectionHeadingDiv";
import NextBtnDiv from "./NextBtnDiv";
import { useHistory } from "react-router-dom";
import { ORGANISATION_INVITATIONS } from "../../constants/Routes";
import { OrgHomeDataResponse } from "../../types/OrgHome";

type InvitationsInfoCardProps = {
  invitationsSummary: OrgHomeDataResponse["invitationsSummary"] | null;
};

const InvitationsInfoCard = ({
  invitationsSummary,
}: InvitationsInfoCardProps) => {
  const history = useHistory();

  const handleInvitationsInfoNextBtnClick = () => {
    history.push(ORGANISATION_INVITATIONS);
  };

  return (
    <div className="InvitationsInfoCard">
      <SectionHeadingDiv headingText="Invitations" />
      <div className="StatNImgContainer">
        <div className="TotalStatDiv">
          <CurrentStatDiv
            divHeadingText="Total"
            divHeadingValue={String(invitationsSummary?.total ?? "")}
          />
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
        <CurrentStatDiv
          divHeadingText="Accepted"
          divHeadingValue={String(invitationsSummary?.accepted ?? "")}
        />
        <CurrentStatDiv
          divHeadingText="Pending"
          divHeadingValue={String(invitationsSummary?.pending ?? "")}
        />
      </div>
      <NextBtnDiv onClick={handleInvitationsInfoNextBtnClick} />
    </div>
  );
};

export default InvitationsInfoCard;
