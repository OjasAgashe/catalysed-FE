import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsChevronDoubleRight } from "react-icons/bs";
import { OrganisationDirectoryCommonResponse } from "../../types/OrganisationDirectory";
import "./OrgDirectoryCard.css";

type OrgDirectoryCardProps = {
  data: OrganisationDirectoryCommonResponse;
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
            overlay={<Tooltip id="data-name-tooltip">{data.name}</Tooltip>}
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
              {data.email.length > 10
                ? `${data.email.substring(0, 10)}...`
                : data.email}
            </span>
          </OverlayTrigger>
        </div>
        <div className="CardActiveProgramDiv">
          <span className="Text">Active Programs&nbsp;:&nbsp;</span>
          <div>
            {data.topPrograms.length ? (
              <>
                {data.topPrograms.slice(0, 2).map((program) => (
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
