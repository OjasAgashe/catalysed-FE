import React from "react";
import CurrentStatDiv from "./CurrentStatDiv";
import SectionHeadingDiv from "./SectionHeadingDiv";
import NextBtnDiv from "./NextBtnDiv";
import { ORGANISATION_APPLICANTS } from "../../constants/Routes";
import { useHistory } from "react-router-dom";
import { OrgHomeDataResponse } from "../../types/OrgHome";

type ApplicantInfoCardProps = {
  applicationsSummary: OrgHomeDataResponse["applicationsSummary"] | null;
};

const ApplicantInfoCard = ({ applicationsSummary }: ApplicantInfoCardProps) => {
  const history = useHistory();

  const handleApplicantInfoNextBtnClick = () => {
    history.push(ORGANISATION_APPLICANTS);
  };

  return (
    <div className="ApplicantsInfoCard">
      <SectionHeadingDiv headingText="Applicants" />

      <div className="ApplicantsSubHeading">Mentor</div>
      <div className="MentorApplicants">
        <CurrentStatDiv
          divHeadingText="Pending"
          divHeadingValue={String(
            applicationsSummary?.mentorDetails.pending ?? ""
          )}
        />
        <CurrentStatDiv
          divHeadingText="Not Viewed"
          divHeadingValue={String(
            applicationsSummary?.mentorDetails.notViewed ?? ""
          )}
        />
      </div>

      <div className="ApplicantsSubHeading">Student</div>
      <div className="StudentApplicants">
        <CurrentStatDiv
          divHeadingText="Pending"
          divHeadingValue={String(
            applicationsSummary?.studentDetails.pending ?? ""
          )}
        />
        <CurrentStatDiv
          divHeadingText="Not Viewed"
          divHeadingValue={String(
            applicationsSummary?.studentDetails.notViewed ?? ""
          )}
        />
      </div>

      <NextBtnDiv onClick={handleApplicantInfoNextBtnClick} />
    </div>
  );
};

export default ApplicantInfoCard;
