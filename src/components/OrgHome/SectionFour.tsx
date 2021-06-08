import React from "react";
import SectionHeadingDiv from "./SectionHeadingDiv";
import ErrorNoProgramsDiv from "./ErrorNoProgramsDiv";
import ProgramCard from "../ProgramCard/ProgramCard";
import NextBtnDiv from "./NextBtnDiv";
import { OrgHomeState } from "../../types/OrgHome";
import { useHistory } from "react-router-dom";
import { ORGANISATION_PROGRAM_VIEW_SEARCH } from "../../constants/Routes";

type SectionFourProps = {
  state: OrgHomeState;
};

const SectionFour = ({ state }: SectionFourProps) => {
  const history = useHistory();

  const handleSectionFourNextBtnClick = () => {
    history.push(`${ORGANISATION_PROGRAM_VIEW_SEARCH}/in_progress`);
  };

  return (
    <section className="OrgHomeSectionFourContainer">
      <SectionHeadingDiv headingText="Ongoing Programs" />
      {state.ongoingPrograms.length === 0 ? (
        <ErrorNoProgramsDiv />
      ) : (
        <div className="ProgramCardContainer">
          {state.ongoingPrograms.map((program: any) => (
            <ProgramCard
              program={program}
              key={program.id}
              classNames="ProgramCardBackgroundColor"
            />
          ))}
          <div
            className={`NextBtnDivContainer ${
              state.ongoingPrograms.length >= 2 &&
              "NextBtnDivContainerWithRight"
            }`}
          >
            <NextBtnDiv
              classNames="NextBtnDivItem"
              onClick={handleSectionFourNextBtnClick}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionFour;
