import React from "react";
import { MentorDashboardSessionDetailsCardData } from "../../types/MentorDashboardSessionDetails";
import { Button, Card } from "react-bootstrap";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";

import "./MentorDashboardSessionCard.css";

/*
 * This component has been used on the pages, on which we
 * need Cards like on Mentor Dashboard page
 */

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
      <Card.Header className="DashboardCardHeader">
        <Button className="PinContainerButton" onClick={pinnedOnClick}>
          {data.pinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
        </Button>
      </Card.Header>
      <Card.Body className="DashboardCardBody" onClick={cardBodyOnClick}>
        <Card.Title
          className="DashboardCardTitle"
          dangerouslySetInnerHTML={{
            __html: data.sessionNoteTitle,
          }}
        />
        <Card.Text
          className="DashboardCardText"
          dangerouslySetInnerHTML={{
            __html: data.sessionNoteDescription,
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default MentorDashboardSessionCard;
