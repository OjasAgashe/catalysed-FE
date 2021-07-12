import React from "react";
import CurrentStatDiv from "./CurrentStatDiv";
import SectionHeadingDiv from "./SectionHeadingDiv";
import NextBtnDiv from "./NextBtnDiv";
import { ORGANISATION_APPLICANTS } from "../../constants/Routes";
import { useHistory } from "react-router-dom";

const ApplicantInfoCard = () => {
  const history = useHistory();

  const handleApplicantInfoNextBtnClick = () => {
    history.push(ORGANISATION_APPLICANTS);
  };

  return (
    <div className="ApplicantsInfoCard">
      <SectionHeadingDiv headingText="Applicants" />

      <div className="ApplicantsSubHeading">Mentor</div>
      <div className="MentorApplicants">
        <CurrentStatDiv divHeadingText="Pending" divHeadingValue="0" />
        <CurrentStatDiv divHeadingText="Not Viewed" divHeadingValue="0" />
      </div>

      <div className="ApplicantsSubHeading">Student</div>
      <div className="StudentApplicants">
        <CurrentStatDiv divHeadingText="Pending" divHeadingValue="0" />
        <CurrentStatDiv divHeadingText="Not Viewed" divHeadingValue="0" />
      </div>

      <NextBtnDiv onClick={handleApplicantInfoNextBtnClick} />
    </div>
  );
};

export default ApplicantInfoCard;
