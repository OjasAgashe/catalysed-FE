import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OrgProgramParticipantData } from "../../types/OrgProgramDetails";
import "./OrgProgramParticipantCard.css";

type OrgProgramParticipantCardProps = {
  details: OrgProgramParticipantData;
};

const OrgProgramParticipantCard = ({
  details,
}: OrgProgramParticipantCardProps) => {
  return (
    <div className="ParticipantCard">
      <div className="ParticipantCardNameUsernameContainer">
        <div className="ParticipantCardName">
          {/* {details.firstName}&nbsp;{details.lastName} */}
          firstName&nbsp;lastName
        </div>
        <div className="ParticipantCardUsername">{details.userName}</div>
      </div>
      <div className="ParticipantCardDetails">
        <div className="ParticipantCardEmail">
          <span className="Text">Email&nbsp;:&nbsp;</span>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="email-tooltip">{details.email}</Tooltip>}
          >
            <span className="Data">
              {details.email.length > 10
                ? `${details.email.substring(0, 10)}...`
                : details.email}
            </span>
          </OverlayTrigger>
        </div>
        <div className="ParticipantCardRole">
          <span className="Text">Role&nbsp;:&nbsp;</span>
          <span className="Data">{details.roles}</span>
        </div>
        <div className="ParticipantCardST">
          <span className="Text">Subscription Type&nbsp;:&nbsp;</span>
          <span className="Data">{details.subscriptionType}</span>
        </div>
        <div className="ParticipantCardState">
          <span className="Text">State&nbsp;:&nbsp;</span>
          <span className="Data">
            {details.active ? "active" : "in-active"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrgProgramParticipantCard;
