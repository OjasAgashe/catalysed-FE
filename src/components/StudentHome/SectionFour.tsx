import React from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  MENTOR_SUGGESTED_PROGRAMS,
  STUDENT_SUGGESTED_PROGRAMS,
} from "../../constants/Routes";
import { StudentHomeState } from "../../types/StudentHome";
import NextBtnDiv from "../OrgHome/NextBtnDiv";
import SectionHeadingDiv from "../OrgHome/SectionHeadingDiv";
import ProgramCard from "../ProgramCard/ProgramCard";

type SectionFourProps = {
  state: StudentHomeState;
};

const SectionFour = ({ state }: SectionFourProps) => {
  const history = useHistory();

  /*
   * On click of View all Button in Suggested Programs section, we will
   * push the current entity (Mentor or Student), to there respected
   * Suggested Programs Pages
   */
  const handleSectionFourNextBtnClick = () => {
    if (state.entity === STUDENT) {
      history.push(STUDENT_SUGGESTED_PROGRAMS);
    } else if (state.entity === MENTOR) {
      history.push(MENTOR_SUGGESTED_PROGRAMS);
    }
  };

  /*
   * On click of the Program Card, showing in Suggested Programs section,
   * We will push the current entity to there respected suggested program
   * details page
   */
  const handleProgramCardClick = (id: number) => {
    if (state.entity === STUDENT) {
      history.push(`${STUDENT_SUGGESTED_PROGRAMS}/${id}/details`);
    } else if (state.entity === MENTOR) {
      history.push(`${MENTOR_SUGGESTED_PROGRAMS}/${id}/details`);
    }
  };

  return (
    <section className="OrgHomeSectionFourContainer">
      {/*
       * Using SectionHeadingDiv component of OrgHome, to show Heading
       */}
      <SectionHeadingDiv headingText="Suggested Programs" />

      {state.suggestedPrograms.length === 0 ? (
        /*
         * If there are no programs in state.suggestedPrograms, then show an
         * Error
         */
        <Alert variant="danger" className="ErrorNoProgramsDiv">
          Sorry !! We have no Suggested Programs for you
        </Alert>
      ) : (
        /*
         * And If there are programs in state.suggestedPrograms, then show
         * that Programs
         */
        <div className="ProgramCardContainer">
          {state.suggestedPrograms.map((program) => (
            <ProgramCard
              program={program}
              key={program.id}
              handleEntityCardClick={() => handleProgramCardClick(program.id)}
              classNames="ProgramCardBackgroundColor"
            />
          ))}
          <div
            className={`NextBtnDivContainer ${
              state.suggestedPrograms.length >= 2 &&
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
