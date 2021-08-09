import React from "react";
import { OrgHomeStudentInfoCard } from "../../assets/Illustrations/Illustrations";
import CurrentStatDiv from "./CurrentStatDiv";
import SectionHeadingDiv from "./SectionHeadingDiv";
import NextBtnDiv from "./NextBtnDiv";
import { ORGANISATION_DIRECTORY } from "../../constants/Routes";
import { useHistory } from "react-router-dom";
import { OrgHomeDataResponse } from "../../types/OrgHome";

type StudentInfoCardProps = {
  studentSummary: OrgHomeDataResponse["studentSummary"] | null;
};

const StudentInfoCard = ({ studentSummary }: StudentInfoCardProps) => {
  const history = useHistory();

  const handleStudentInfoNextBtnClick = () => {
    history.push(`${ORGANISATION_DIRECTORY}?type=STUDENT`);
  };

  return (
    <div className="StudentInfoCard">
      <SectionHeadingDiv headingText="Student" />
      <div className="StatNImgContainer">
        <div className="StudentInfoCardImgContainer">
          <img
            src={OrgHomeStudentInfoCard}
            alt="mentor info card illustration"
            className="OrgHomeStudentInfoCardImg"
          />
        </div>

        <div className="StatDivContainer">
          <div className="TotalStatDiv">
            <CurrentStatDiv
              divHeadingText="Total"
              divHeadingValue={String(studentSummary?.total ?? "")}
            />
          </div>
          <div className="NewThisMonthDiv">
            <CurrentStatDiv
              divHeadingText="New This Month"
              divHeadingValue={String(studentSummary?.newThisMonth ?? "")}
            />
          </div>
        </div>
      </div>
      <NextBtnDiv onClick={handleStudentInfoNextBtnClick} />
    </div>
  );
};

export default StudentInfoCard;
