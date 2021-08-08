import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsChevronDoubleRight } from "react-icons/bs";
import { StudentConnectedOrgData } from "../../types/StudentUpdates";

type StuUpdatesOrganisationCardProps = {
  data: StudentConnectedOrgData;
  handleUpdatesOrganisationCardViewAllBtnClick: (id: number) => void;
};

const StuUpdatesOrganisationCard = ({
  data,
  handleUpdatesOrganisationCardViewAllBtnClick,
}: StuUpdatesOrganisationCardProps) => {
  return (
    <div className="StuUpdatesOrganisationCardContainer">
      <div className="DataContainerDiv">
        <div className="CardNameDiv">
          <span className="Text">Name&nbsp;:&nbsp;</span>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="data-name-tooltip">{data.name}</Tooltip>}
          >
            <span className="Data">
              {data.name.length > 12
                ? `${data.name.substring(0, 12)}...`
                : data.name}
            </span>
          </OverlayTrigger>
        </div>
        <div className="CardDescriptionDiv">
          <span className="Text">Description&nbsp;:&nbsp;</span>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="data-description-tooltip">
                {data.description}
              </Tooltip>
            }
          >
            <span className="Data">
              {data.description.length > 40
                ? `${data.description.substring(0, 40)}...`
                : data.description}
            </span>
          </OverlayTrigger>
        </div>
      </div>
      <div className="NextBtnDiv">
        <button
          className="NextBtnIconContainer"
          onClick={() => handleUpdatesOrganisationCardViewAllBtnClick(data.id)}
        >
          <BsChevronDoubleRight className="NextBtnIcon" />
        </button>
        View all
      </div>
    </div>
  );
};

export default StuUpdatesOrganisationCard;
