import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsChevronDoubleRight } from "react-icons/bs";
import { StudentConnectedProgramData } from "../../types/StudentUpdates";
import "./StuUpdatesCard.css";

type StuUpdatesProgramCardProps = {
  data: StudentConnectedProgramData;
  handleUpdatesProgramCardViewAllBtnClick: (id: number) => void;
};

/*
 * This component will be visible on the pages, on which we will need Cards
 * like on Stu Updates Page (Program Tab)
 */

const StuUpdatesProgramCard = ({
  data,
  handleUpdatesProgramCardViewAllBtnClick,
}: StuUpdatesProgramCardProps) => {
  return (
    <div className="StuUpdatesProgramCardContainer">
      <div className="DataContainerDiv">
        <div className="CardNameDiv">
          <span className="Text">Title&nbsp;:&nbsp;</span>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="data-name-tooltip">{data.title}</Tooltip>}
          >
            <span className="Data">
              {data.title.length > 15
                ? `${data.title.substring(0, 15)}...`
                : data.title}
            </span>
          </OverlayTrigger>
        </div>
        <div className="CardDurationDiv">
          <span className="Text">Duration&nbsp;:&nbsp;</span>
          <span className="Data">{data.durationInMonths} months</span>
        </div>
        <div className="CardModeDiv">
          <span className="Text">Mode&nbsp;:&nbsp;</span>
          <span className="Data">
            {data.mode === "VIRTUAL" ? "Virtual" : "In Person"}
          </span>
        </div>
      </div>
      <div className="NextBtnDiv">
        <button
          className="NextBtnIconContainer"
          onClick={() => handleUpdatesProgramCardViewAllBtnClick(data.id)}
        >
          <BsChevronDoubleRight className="NextBtnIcon" />
        </button>
        View all
      </div>
    </div>
  );
};

export default StuUpdatesProgramCard;
