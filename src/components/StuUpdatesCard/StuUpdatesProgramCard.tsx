import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsChevronDoubleRight } from "react-icons/bs";
import "./StuUpdatesCard.css";

type StuUpdatesProgramCardProps = {
  data: {
    id: number;
    name: string;
    duration: string;
    mode: string;
  };
  handleUpdatesProgramCardViewAllBtnClick: (id: number) => void;
};

const StuUpdatesProgramCard = ({
  data,
  handleUpdatesProgramCardViewAllBtnClick,
}: StuUpdatesProgramCardProps) => {
  return (
    <div className="StuUpdatesProgramCardContainer">
      <div className="DataContainerDiv">
        <div className="CardNameDiv">
          <span className="Text">Name&nbsp;:&nbsp;</span>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="data-name-tooltip">{data.name}</Tooltip>}
          >
            <span className="Data">
              {data.name.length > 15
                ? `${data.name.substring(0, 15)}...`
                : data.name}
            </span>
          </OverlayTrigger>
        </div>
        <div className="CardDurationDiv">
          <span className="Text">Duration&nbsp;:&nbsp;</span>
          <span className="Data">{data.duration} months</span>
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
