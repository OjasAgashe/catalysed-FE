import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import MentorOrStudentTab from "../../components/MentorOrStudentTab/MentorOrStudentTab";
import OrgProgramApplicantDetails from "../../components/OrgProgramApplicantDetails/OrgProgramApplicantDetails";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import { orgProgramApplicantReducer } from "../../reducers/orgProgramApplicantReducer";

const OrgProgramApplicantsPage = () => {
  const [state, dispatch] = useReducer(orgProgramApplicantReducer, {
    showMentorDetails: true,
    showStudentDetails: false,
    searchedNotPresentText: "",
    selectedDropdownForSortDoA: "All",
    selectedDropdownForFilterStatus: "All",
    selectedDropdownForFilterViewed: "All",
  });

  const fakeData = [
    {
      id: 1,
      date_of_application: "28/06/2021",
      email: "foo@gmail.com",
      name: "Stefan",
      status: "pending",
      viewed: "no",
    },
    {
      id: 2,
      date_of_application: "28/06/2021",
      email: "foo@gmail.com",
      name: "Damon",
      status: "accepted",
      viewed: "no",
    },
    {
      id: 3,
      date_of_application: "28/06/2021",
      email: "foo@gmail.com",
      name: "Howard Wolvowitiz",
      status: "pending",
      viewed: "yes",
    },
    {
      id: 4,
      date_of_application: "28/06/2021",
      email: "foo@gmail.com",
      name: "Paul Wisely",
      status: "rejected",
      viewed: "no",
    },
  ];

  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Program Applicants | CatalysEd";
  });

  return (
    <div className="OrgProgramApplicantsPage">
      <OrgProgramDetailsCommon
        programTitle=""
        programId={parseInt(programId)}
      />

      <MentorOrStudentTab
        programApplicantState={state}
        programApplicantDispatch={dispatch}
      />

      <OrgProgramApplicantDetails
        state={state}
        dispatch={dispatch}
        fakeData={fakeData}
      />
    </div>
  );
};

export default OrgProgramApplicantsPage;
