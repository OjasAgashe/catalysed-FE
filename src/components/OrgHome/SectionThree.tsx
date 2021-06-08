import React from "react";
import SectionHeadingDiv from "./SectionHeadingDiv";
import ErrorNoProgramsDiv from "./ErrorNoProgramsDiv";
import ProgramCard from "../ProgramCard/ProgramCard";
import NextBtnDiv from "./NextBtnDiv";
import { OrgHomeState } from "../../types/OrgHome";
import { useHistory } from "react-router-dom";
import { ORGANISATION_PROGRAM_VIEW_SEARCH } from "../../constants/Routes";

type SectionThreeProps = {
  state: OrgHomeState;
};

const SectionThree = ({ state }: SectionThreeProps) => {
  const history = useHistory();

  const handleSectionThreeNextBtnClick = () => {
    history.push(`${ORGANISATION_PROGRAM_VIEW_SEARCH}/this_month`);
  };

  return (
    <section className="OrgHomeSectionThreeContainer">
      <SectionHeadingDiv
        headingText={`Programs starting in this ${new Date(
          Date.now()
        ).toLocaleString("en-US", { month: "long" })} month`}
      />
      {state.programsStartingThisMonth.length === 0 ? (
        <ErrorNoProgramsDiv />
      ) : (
        <div className="ProgramCardContainer">
          {state.programsStartingThisMonth.map((program: any) => (
            <ProgramCard
              program={program}
              key={program.id}
              classNames="ProgramCardBackgroundColor"
            />
          ))}
          <div
            className={`NextBtnDivContainer ${
              state.programsStartingThisMonth.length >= 2 &&
              "NextBtnDivContainerWithRight"
            }`}
          >
            <NextBtnDiv
              classNames="NextBtnDivItem"
              onClick={handleSectionThreeNextBtnClick}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionThree;
