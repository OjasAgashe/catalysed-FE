import React from "react";
import { GetProgramMetaListData } from "../../types/OrgViewSearchProgram";
import "./ProgramCard.css";
import { BiExpand } from "react-icons/bi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FooterBackground,
  HeaderBackground,
} from "../../assets/Illustrations/Illustrations";

type ProgramCardProps = {
  program: GetProgramMetaListData;
};

const ProgramCard = ({ program }: ProgramCardProps) => {
  return (
    <div className="ProgramCard">
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
          <span className="Text">Tentative Start Date</span>&nbsp;:&nbsp;
          <span className="Data">{program.tentativeStartDate}</span>
        </div>
        <div className="ProgramCardDIMonths">
          <span className="Text">Duration</span>&nbsp;:&nbsp;
          <span className="Data">{program.durationInMonths}</span>
        </div>
        <div className="ProgramCardMode">
          <span className="Text">Mode</span>&nbsp;:&nbsp;
          <span className="Data">{program.mode}</span>
        </div>
        <div className="ProgramCardLanguage">
          <span className="Text">Language Requirements</span>&nbsp;:&nbsp;
          {program.languageRequirements.length ? (
            <div className="CardLanguageRequirementsDiv">
              {program.languageRequirements.split(",").map(
                (language, id) =>
                  id < 2 && (
                    <span key={id} className="Data">
                      {language.trim()}
                    </span>
                  )
              )}
            </div>
          ) : (
            <span className="Data NoLangData">&nbsp;</span>
          )}
        </div>
        <div className="ProgramCardStatus">
          <span className="Text">Status</span>&nbsp;:&nbsp;
          <span className="Data">
            {program.status === "SAVED_TO_DRAFT" ? "IN DRAFT" : program.status}
          </span>
        </div>
      </div>

      <div className="ProgramCardButton">
        <button type="button" className="ViewDetailsBtn">
          <BiExpand className="ExpandCardBtnIcon" />
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
