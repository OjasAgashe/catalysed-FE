import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import MentorOrStudentTab from "../../components/MentorOrStudentTab/MentorOrStudentTab";
import OrgProgramApplicantDetails from "../../components/OrgProgramApplicantDetails/OrgProgramApplicantDetails";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import { orgProgramApplicantReducer } from "../../reducers/orgProgramApplicantReducer";

const OrgProgramApplicantsPage = () => {
  const [state, dispatch] = useReducer(orgProgramApplicantReducer, {
    fakeData: [
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
    ],
    programTitle: "",
    showMentorDetails: true,
    showStudentDetails: false,
    searchedName: "",
    searchedNotPresentText: "",
    selectedDropdownForSortDoA: "All",
    selectedDropdownForFilterStatus: "All",
    selectedDropdownForFilterViewed: "All",
  });

  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Program Applicants | CatalysEd";

    const sortInOrder = () => {
      let tempData = [...state.fakeData];

      // status: pending && viewed: no
      tempData = state.fakeData.filter(
        (data) => data.status === "pending" && data.viewed === "no"
      );

      // status: pending && viewed: yes
      tempData.push.apply(
        tempData,
        state.fakeData.filter(
          (data) => data.status === "pending" && data.viewed === "yes"
        )
      );

      // status: accepted && viewed: no
      tempData.push.apply(
        tempData,
        state.fakeData.filter(
          (data) => data.status === "accepted" && data.viewed === "no"
        )
      );

      // status: accepted && viewed: yes
      tempData.push.apply(
        tempData,
        state.fakeData.filter(
          (data) => data.status === "accepted" && data.viewed === "yes"
        )
      );

      // status: rejected && viewed: no
      tempData.push.apply(
        tempData,
        state.fakeData.filter(
          (data) => data.status === "rejected" && data.viewed === "no"
        )
      );

      // status: rejected && viewed: yes
      tempData.push.apply(
        tempData,
        state.fakeData.filter(
          (data) => data.status === "rejected" && data.viewed === "yes"
        )
      );

      dispatch({ type: "fakeData", payload: tempData });
    };

    sortInOrder();
  }, []);

  return (
    <div className="OrgProgramApplicantsPage">
      <OrgProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
      />

      <MentorOrStudentTab
        programApplicantState={state}
        programApplicantDispatch={dispatch}
      />

      <OrgProgramApplicantDetails
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
};

export default OrgProgramApplicantsPage;
