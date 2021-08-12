import React from "react";
import CurrentStatDiv from "../OrgHome/CurrentStatDiv";
import SectionHeadingDiv from "../OrgHome/SectionHeadingDiv";
import { OrgHomeMentorInfoCard } from "../../assets/Illustrations/Illustrations";
import { useHistory } from "react-router-dom";
import { MENTOR_UPDATES, STUDENT_UPDATES } from "../../constants/Routes";
import NextBtnDiv from "../OrgHome/NextBtnDiv";
import { MENTOR, STUDENT } from "../../constants/Entities";
import { StudentHomeState } from "../../types/StudentHome";

type ProgramInfoCardProps = {
  state: StudentHomeState;
};

const ProgramInfoCard = ({ state }: ProgramInfoCardProps) => {
  const history = useHistory();

  const handleProgramInfoCardBtnClick = () => {
    if (state.entity === STUDENT)
      history.push(`${STUDENT_UPDATES}?view=PROGRAMS`);
    else if (state.entity === MENTOR)
      history.push(`${MENTOR_UPDATES}?view=PROGRAMS`);
  };

  return (
    <div className="MentorInfoCard">
      <SectionHeadingDiv headingText="Program" />
      <div className="StatNImgContainer">
        <div className="StatDivContainer">
          <div className="TotalStatDiv">
            <CurrentStatDiv divHeadingText="Connected" divHeadingValue="0" />
          </div>
          <div className="NewThisMonthDiv">
            <CurrentStatDiv divHeadingText="Applied" divHeadingValue="0" />
          </div>
        </div>
        <div className="MentorInfoCardImgContainer">
          <img
            src={OrgHomeMentorInfoCard}
            alt="mentor info card illustration"
            className="OrgHomeMentorInfoCardImg"
          />
        </div>
      </div>
      <NextBtnDiv onClick={handleProgramInfoCardBtnClick} />
    </div>
  );
};

export default ProgramInfoCard;
