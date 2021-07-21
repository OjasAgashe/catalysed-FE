import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrgApplicantsPageDetails from "../../components/OrgApplicantsPageDetails/OrgApplicantsPageDetails";
import OrgApplicantsPageHeader from "../../components/OrgApplicantsPageHeader/OrgApplicantsPageHeader";
import {
  ORGANISATION_APPLICANTS,
  ORGANISATION_INVITATIONS,
} from "../../constants/Routes";

const OrgApplicantsPage = () => {
  const [searchedName, setSearchedName] = useState("");
  const [filteredResponseData, setFilteredResponseData] = useState<
    {
      id: number;
      program_name: string;
      mentor_pending: number;
      mentor_not_viewed: number;
      student_pending: number;
      student_not_viewed: number;
    }[]
  >([]);
  const [searchedNameNotFound, setSearchedNameNotFound] = useState(false);
  const [pageHeaderText, setPageHeaderText] = useState("");

  const fakeData = [
    {
      id: 1,
      program_name:
        "Get familiar with Web Development using Reactjs Get familiar with Web Development using Reactjs",
      mentor_pending: 5,
      mentor_not_viewed: 4,
      student_pending: 8,
      student_not_viewed: 6,
    },
    {
      id: 2,
      program_name: "Learn HTML",
      mentor_pending: 5,
      mentor_not_viewed: 4,
      student_pending: 8,
      student_not_viewed: 6,
    },
    {
      id: 3,
      program_name: "Get familiar with Web Development using Reactjs",
      mentor_pending: 5,
      mentor_not_viewed: 4,
      student_pending: 8,
      student_not_viewed: 6,
    },

    {
      id: 4,
      program_name: "Learn HTML",
      mentor_pending: 5,
      mentor_not_viewed: 4,
      student_pending: 8,
      student_not_viewed: 6,
    },
  ];

  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    if (location.pathname === ORGANISATION_APPLICANTS) {
      document.title = "Org Applicants | CatalysEd";
      setPageHeaderText("Applicants");
    } else if (location.pathname === ORGANISATION_INVITATIONS) {
      document.title = "Org Invitations | CatalysEd";
      setPageHeaderText("Invitations");
    }
  }, [location.pathname]);

  return (
    <div className="OrgApplicantsPage Page">
      <OrgApplicantsPageHeader
        searchedName={searchedName}
        setSearchedName={setSearchedName}
        setFilteredResponseData={setFilteredResponseData}
        fakeData={fakeData}
        setSearchedNameNotFound={setSearchedNameNotFound}
        pageHeaderText={pageHeaderText}
      />

      <OrgApplicantsPageDetails
        searchedName={searchedName}
        fakeData={fakeData}
        filteredResponseData={filteredResponseData}
        searchedNameNotFound={searchedNameNotFound}
        pageHeaderText={pageHeaderText}
      />
    </div>
  );
};

export default OrgApplicantsPage;
