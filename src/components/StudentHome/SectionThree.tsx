import React from "react";
import { useHistory } from "react-router-dom";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  MENTOR_UPDATES,
  MENTOR_UPDATES_DETAILS_PROGRAM,
  STUDENT_UPDATES,
  STUDENT_UPDATES_DETAILS_PROGRAM,
} from "../../constants/Routes";
import { StudentHomeState } from "../../types/StudentHome";
import NextBtnDiv from "../OrgHome/NextBtnDiv";
import SectionHeadingDiv from "../OrgHome/SectionHeadingDiv";
import ProgramCard from "../ProgramCard/ProgramCard";
import SectionThreeErrorDiv from "./SectionThreeErrorDiv";

type SectionThreeProps = {
  state: StudentHomeState;
};

const SectionThree = ({ state }: SectionThreeProps) => {
  const history = useHistory();

  const handleSectionThreeNextBtnClick = () => {
    if (state.entity === STUDENT) {
      history.push(`${STUDENT_UPDATES}?view=PROGRAMS`);
    } else if (state.entity === MENTOR) {
      history.push(`${MENTOR_UPDATES}?view=PROGRAMS`);
    }
  };

  const handleProgramCardClick = (id: number) => {
    if (state.entity === STUDENT) {
      history.push(`${STUDENT_UPDATES_DETAILS_PROGRAM}/${id}/details`);
    } else if (state.entity === MENTOR) {
      history.push(`${MENTOR_UPDATES_DETAILS_PROGRAM}/${id}/details`);
    }
  };

  return (
    <section className="OrgHomeSectionThreeContainer">
      <SectionHeadingDiv headingText="Connected Programs" />

      <div className="ApplicantsSubHeading">Running</div>
      {state.runningPrograms.length === 0 ? (
        <SectionThreeErrorDiv entity={state.entity} />
      ) : (
        <div className="ProgramCardContainer">
          {state.runningPrograms.map((program) => (
            <ProgramCard
              program={program}
              key={program.id}
              handleEntityCardClick={() => handleProgramCardClick(program.id)}
              classNames="ProgramCardBackgroundColor"
            />
          ))}
          <div
            className={`NextBtnDivContainer ${
              state.runningPrograms.length >= 2 &&
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

      <div className="ApplicantsSubHeading">About to Start</div>
      {state.aboutToStartPrograms.length === 0 ? (
        <SectionThreeErrorDiv entity={state.entity} />
      ) : (
        <div className="ProgramCardContainer">
          {state.aboutToStartPrograms.map((program) => (
            <ProgramCard
              program={program}
              key={program.id}
              handleEntityCardClick={() => handleProgramCardClick(program.id)}
              classNames="ProgramCardBackgroundColor"
            />
          ))}
          <div
            className={`NextBtnDivContainer ${
              state.aboutToStartPrograms.length >= 2 &&
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
