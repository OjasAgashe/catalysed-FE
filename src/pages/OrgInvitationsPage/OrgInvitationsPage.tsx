/*
 * This page shows the summary of invitations of an Org
 */

import React, { useEffect, useState } from "react";
import OrgApplicantsPageDetails from "../../components/OrgApplicantsPageDetails/OrgApplicantsPageDetails";
import OrgApplicantsPageHeader from "../../components/OrgApplicantsPageHeader/OrgApplicantsPageHeader";

const OrgInvitationsPage = () => {
  /*
   * All the states to store data are same as OrgApplicantsPage
   */
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
    /*
     * Whenever anyone visits this page first time, we want the
     * scrollbar position on top
     */
    document.documentElement.scrollTop = 0;

    // set the document title
    document.title = "Org Invitations | CatalysEd";
  }, []);

  return (
    <div className="OrgApplicantsPage Page">
      {/*
       * Show OrgApplicantsPageHeader component
       * with pageHeaderText="Invitations"
       */}
      <OrgApplicantsPageHeader
        searchedName={searchedName}
        setSearchedName={setSearchedName}
        setFilteredResponseData={setFilteredResponseData}
        fakeData={fakeData}
        setSearchedNameNotFound={setSearchedNameNotFound}
        pageHeaderText="Invitations"
      />

      {/*
       * Show OrgApplicantsPageDetails component
       * with pageHeaderText="Invitations"
       */}
      <OrgApplicantsPageDetails
        searchedName={searchedName}
        fakeData={fakeData}
        filteredResponseData={filteredResponseData}
        searchedNameNotFound={searchedNameNotFound}
        pageHeaderText="Invitations"
      />
    </div>
  );
};

export default OrgInvitationsPage;
