import React from "react";
import { MentorDashboardSessionDetailsCardData } from "../../types/MentorDashboardSessionDetails";
import { Button, Card } from "react-bootstrap";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";

import "./MentorDashboardSessionCard.css";

type MentorDashboardSessionCardProps = {
  data: MentorDashboardSessionDetailsCardData;
  cardBodyOnClick?: () => void;
  pinnedOnClick?: () => void;
};

const MentorDashboardSessionCard = ({
  data,
  cardBodyOnClick,
  pinnedOnClick,
}: MentorDashboardSessionCardProps) => {
  return (
    <Card className="DashboardCard" style={{ backgroundColor: data.color }}>
      <Card.Header
        className="DashboardCardHeader"
        style={{ backgroundColor: data.color }}
      >
        <Button
          className="PinContainerButton"
          onClick={pinnedOnClick}
          style={{ backgroundColor: data.color }}
        >
          {data.pinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
        </Button>
      </Card.Header>
      <Card.Body className="DashboardCardBody" onClick={cardBodyOnClick}>
        <Card.Title
          className="DashboardCardTitle"
          style={{ backgroundColor: data.color }}
          dangerouslySetInnerHTML={{
            __html: data.sessionNoteTitle,
          }}
        />
        <Card.Text
          className="DashboardCardText"
          style={{ backgroundColor: data.color }}
          dangerouslySetInnerHTML={{
            __html: data.sessionNoteDescription,
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default MentorDashboardSessionCard;
