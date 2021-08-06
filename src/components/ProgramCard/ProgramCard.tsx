import React from "react";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";
import "./ProgramCard.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FooterBackground,
  HeaderBackground,
} from "../../assets/Illustrations/Illustrations";
import { useHistory } from "react-router";
import {
  MENTOR_SUGGESTED_PROGRAMS,
  ORGANISATION_HOME,
  ORGANISATION_PROGRAM_DETAILS,
  STUDENT_SUGGESTED_PROGRAMS,
} from "../../constants/Routes";
import { FiChevronsRight } from "react-icons/fi";
import { useLocation } from "react-router-dom";

type ProgramCardProps = {
  program: GetProgramMetaListData;
  classNames?: string;
};

const ProgramCard = ({ program, classNames = "" }: ProgramCardProps) => {
  const history = useHistory();
  const location = useLocation();

  const handleCardProgramDetailsBtn = () => {
    if (
      (location.pathname.includes(ORGANISATION_PROGRAM_DETAILS) &&
        (location.pathname.includes("all") ||
          location.pathname.includes("in_progress") ||
          location.pathname.includes("this_month"))) ||
      location.pathname.includes(ORGANISATION_HOME)
    )
      history.push(`${ORGANISATION_PROGRAM_DETAILS}/${program.id}/details`);

    if (location.pathname.includes(STUDENT_SUGGESTED_PROGRAMS))
      history.push(`${STUDENT_SUGGESTED_PROGRAMS}/${program.id}/details`);

    if (location.pathname.includes(MENTOR_SUGGESTED_PROGRAMS))
      history.push(`${MENTOR_SUGGESTED_PROGRAMS}/${program.id}/details`);
  };

  return (
    <div
      className={`ProgramCard ${classNames}`}
      onClick={handleCardProgramDetailsBtn}
    >
      <div
        className="ProgramCardTitle"
        style={{
          backgroundImage: `url(${
            program.id % 2 ? FooterBackground : HeaderBackground
          })`,
        }}
      >
        {program.title === "" ? (
          "Title Not Present"
        ) : (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="title-tooltip">{program.title} </Tooltip>}
          >
            <span>
              {program.title.length > 17
                ? `${program.title.substring(0, 17)}...`
                : program.title}
            </span>
          </OverlayTrigger>
        )}
      </div>

      <div className="ProgramCardDetails">
        <div className="ProgramCardTSDate">
          <span className="Text">Tentative Start Date&nbsp;:&nbsp;</span>
          <span className="Data">{program.tentativeStartDate}</span>
        </div>
        <div className="ProgramCardDIMonths">
          <span className="Text">Duration&nbsp;:&nbsp;</span>
          <span className="Data">{program.durationInMonths} months</span>
        </div>
        <div className="ProgramCardMode">
          <span className="Text">Mode&nbsp;:&nbsp;</span>
          <span className="Data">{program.mode}</span>
        </div>
        <div className="ProgramCardLanguage">
          <span className="Text">Language Requirements&nbsp;:&nbsp;</span>
          {program.languageRequirements.length ? (
            <div className="CardLanguageRequirementsDiv">
              {program.languageRequirements.split(",").map(
                (language, id) =>
                  id < 2 && (
                    <div key={id} className="Data">
                      {language.trim()}
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="Data NoLangData">&nbsp;</div>
          )}
        </div>
        <div className="ProgramCardStatus">
          <span className="Text">Status&nbsp;:&nbsp;</span>
          <span className="Data">
            {program.status === "SAVED_TO_DRAFT" ? "IN DRAFT" : program.status}
          </span>
        </div>
      </div>

      <div className="ProgramCardButton">
        <button
          type="button"
          className="ViewDetailsBtn"
          onClick={handleCardProgramDetailsBtn}
        >
          Show more
          <span>
            &nbsp;
            <FiChevronsRight className="DoubleRightArrowShowDetails" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
