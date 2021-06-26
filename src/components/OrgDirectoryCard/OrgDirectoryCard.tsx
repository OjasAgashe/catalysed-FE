import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsChevronDoubleRight } from "react-icons/bs";
import "./OrgDirectoryCard.css";

type OrgDirectoryCardProps = {
  data: {
    id: number;
    name: string;
    email: string;
    active_programs: string[];
  };

  handleDirectoryCardViewAllBtnClick: (id: number) => void;
};

const OrgDirectoryCard = ({
  data,
  handleDirectoryCardViewAllBtnClick,
}: OrgDirectoryCardProps) => {
  return (
    <div className="OrgDirectoryCardContainer">
      <div className="DataContainerDiv">
        <div className="CardNameDiv">
          <span className="Text">Name&nbsp;:&nbsp;</span>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="data-email-tooltip">{data.name}</Tooltip>}
          >
            <span className="Data">
              {data.name.length > 15
                ? `${data.name.substring(0, 15)}...`
                : data.name}
            </span>
          </OverlayTrigger>
        </div>
        <div className="CardEmailDiv">
          <span className="Text">Email&nbsp;:&nbsp;</span>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="data-email-tooltip">{data.email}</Tooltip>}
          >
            <span className="Data">
              {data.email.length > 18
                ? `${data.email.substring(0, 18)}...`
                : data.email}
            </span>
          </OverlayTrigger>
        </div>
        <div className="CardActiveProgramDiv">
          <span className="Text">Active Programs&nbsp;:&nbsp;</span>
          <div>
            {data.active_programs.length ? (
              <>
                {data.active_programs.map((program) => (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="program-tooltip">{program}</Tooltip>}
                  >
                    <div key={program} className="Data">
                      {program.length > 15
                        ? `${program.substring(0, 15)}..`
                        : program}
                      ,
                    </div>
                  </OverlayTrigger>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="NextBtnDiv">
        <button
          className="NextBtnIconContainer"
          onClick={() => handleDirectoryCardViewAllBtnClick(data.id)}
        >
          <BsChevronDoubleRight className="NextBtnIcon" />
        </button>
        View all
      </div>
    </div>
  );
};

export default OrgDirectoryCard;
