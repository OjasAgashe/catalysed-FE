import React, { useEffect, useState } from "react";
import OrgApplicantsPageDetails from "../../components/OrgApplicantsPageDetails/OrgApplicantsPageDetails";
import OrgApplicantsPageHeader from "../../components/OrgApplicantsPageHeader/OrgApplicantsPageHeader";

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

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Org Applicants | CatalysEd";
  });

  return (
    <div className="OrgApplicantsPage">
      <OrgApplicantsPageHeader
        searchedName={searchedName}
        setSearchedName={setSearchedName}
        setFilteredResponseData={setFilteredResponseData}
        fakeData={fakeData}
        setSearchedNameNotFound={setSearchedNameNotFound}
      />

      <OrgApplicantsPageDetails
        searchedName={searchedName}
        fakeData={fakeData}
        filteredResponseData={filteredResponseData}
        searchedNameNotFound={searchedNameNotFound}
      />
    </div>
  );
};

export default OrgApplicantsPage;
