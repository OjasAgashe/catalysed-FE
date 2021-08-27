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
  pageHeaderText: string;
};

const OrgApplicantsPageDetails = ({
  searchedName,
  fakeData,
  filteredResponseData,
  searchedNameNotFound,
  pageHeaderText,
}: OrgApplicantsPageDetailsProps) => {
  return (
    <div className="OrgApplicantsPageDetails">
      <div className="OrgApplicantsPageDetailsContainer">
        {fakeData.length ? (
          /*
           * Show the table only when we have some data
           */
          <OrgApplicantsPageDataContainer
            searchedName={searchedName}
            fakeData={fakeData}
            filteredResponseData={filteredResponseData}
            searchedNameNotFound={searchedNameNotFound}
            pageHeaderText={pageHeaderText}
          />
        ) : (
          /*
           * else show an error message
           */
          <div className="ErrorCompContainer">
            <Error message="No Applicants Yet !!" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgApplicantsPageDetails;
