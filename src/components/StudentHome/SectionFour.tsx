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

  const handleSectionFourNextBtnClick = () => {
    if (state.entity === STUDENT) {
      history.push(STUDENT_SUGGESTED_PROGRAMS);
    } else if (state.entity === MENTOR) {
      history.push(MENTOR_SUGGESTED_PROGRAMS);
    }
  };

  return (
    <section className="OrgHomeSectionFourContainer">
      <SectionHeadingDiv headingText="Suggested Programs" />
      {state.suggestedPrograms.length === 0 ? (
        <Alert variant="danger" className="ErrorNoProgramsDiv">
          Sorry !! We have no Suggested Programs for you
        </Alert>
      ) : (
        <div className="ProgramCardContainer">
          {state.suggestedPrograms.map((program) => (
            <ProgramCard
              program={program}
              key={program.id}
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
