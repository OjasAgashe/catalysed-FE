import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  OrgProgramParticipantData,
  OrgProgramParticipantState,
} from "../../types/OrgProgramDetails";
import "./OrgProgramParticipantCard.css";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import {
  ORGANISATION_DIRECTORY_DETAILS_MENTOR,
  ORGANISATION_DIRECTORY_DETAILS_STUDENT,
} from "../../constants/Routes";
import { useHistory } from "react-router-dom";

type OrgProgramParticipantCardProps = {
  details: OrgProgramParticipantData;
  state: OrgProgramParticipantState;
};

const OrgProgramParticipantCard = ({
  details,
  state,
}: OrgProgramParticipantCardProps) => {
  const history = useHistory();

  const handleParticipantCardClick = () => {
    if (state.showMentorDetails) {
      history.push(
        `${ORGANISATION_DIRECTORY_DETAILS_MENTOR}/${details.id}/details`
      );
    } else if (state.showStudentDetails) {
      history.push(
        `${ORGANISATION_DIRECTORY_DETAILS_STUDENT}/${details.id}/details`
      );
    }
  };

  return (
    <div className="ParticipantCard" onClick={handleParticipantCardClick}>
      <div className="ParticipantCardNameContainer">
        <div className="ParticipantCardName">
          {details.firstName}&nbsp;{details.lastName}
        </div>
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
        <div className="ParticipantCardPhone">
          <span className="Text">Phone&nbsp;:&nbsp;</span>
          <span className="PhoneData">
            <ReactCountryFlag
              countryCode={getCode(details.phone.countryName ?? "")}
              svg
              style={{
                width: "1.5em",
                height: "1.35em",
                boxShadow: "2px 2px 8px var(--blue-gray-300)",
                padding: "0",
                verticalAlign: "sub",
              }}
            />
            &nbsp;&nbsp;
            <span className="Data">{details.phone.countryCode}</span>
            &nbsp;
            <span className="Data">{details.phone.number}</span>
          </span>
        </div>
        <div className="ParticipantCardRegion">
          <span className="Text">Region&nbsp;:&nbsp;</span>
          <span className="Data">{details.location.region}</span>
        </div>
        <div className="ParticipantCardCountry">
          <span className="Text">Country&nbsp;:&nbsp;</span>
          <span className="Data">{details.location.country}</span>
        </div>
      </div>
    </div>
  );
};

export default OrgProgramParticipantCard;
