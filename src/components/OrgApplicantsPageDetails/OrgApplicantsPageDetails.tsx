import React from "react";
import Error from "../Error/Error";
import OrgApplicantsPageDataContainer from "./OrgApplicantsPageDataContainer";
import "./OrgApplicantsPageDetails.css";

type OrgApplicantsPageDetailsProps = {
  searchedName: string;
  fakeData: {
    id: number;
    program_name: string;
    mentor_pending: number;
    mentor_not_viewed: number;
    student_pending: number;
    student_not_viewed: number;
  }[];
  filteredResponseData: {
    id: number;
    program_name: string;
    mentor_pending: number;
    mentor_not_viewed: number;
    student_pending: number;
    student_not_viewed: number;
  }[];
  searchedNameNotFound: boolean;
};

const OrgApplicantsPageDetails = ({
  searchedName,
  fakeData,
  filteredResponseData,
  searchedNameNotFound,
}: OrgApplicantsPageDetailsProps) => {
  return (
    <div className="OrgApplicantsPageDetails">
      <div className="OrgApplicantsPageDetailsContainer">
        {fakeData.length ? (
          <OrgApplicantsPageDataContainer
            searchedName={searchedName}
            fakeData={fakeData}
            filteredResponseData={filteredResponseData}
            searchedNameNotFound={searchedNameNotFound}
          />
        ) : (
          <div className="ErrorCompContainer">
            <Error message="No Applicants Yet !!" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgApplicantsPageDetails;
